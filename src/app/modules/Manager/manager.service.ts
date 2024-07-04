/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { TManager } from './manager.interface';
import { Manager } from './manager.model';
import { ManagerSearchableFields } from './manager.constant';

const getAllManagersFromDB = async (query: Record<string, unknown>) => {
  const managerQuery = new QueryBuilder(Manager.find(), query)
    .search(ManagerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await managerQuery.modelQuery;
  const meta = await managerQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleManagerFromDB = async (id: string) => {
  const result = await Manager.findById(id);
  return result;
};

const updateManagerIntoDB = async (id: string, payload: Partial<TManager>) => {
  const { name, ...remainingManagerData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingManagerData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Manager.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteManagerFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedManager = await Manager.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedManager) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Manager');
    }

    // get user _id from deletedManager
    const userId = deletedManager.user;

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedManager;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const ManagerServices = {
  getAllManagersFromDB,
  getSingleManagerFromDB,
  updateManagerIntoDB,
  deleteManagerFromDB,
};
