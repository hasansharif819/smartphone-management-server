/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TManager } from '../Manager/manager.interface';
import { Manager } from '../Manager/manager.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateManagerId, generateSellerId } from './user.utils';
import { TSeller } from '../Seller/seller.interface';
import { Seller } from '../Seller/seller.model';

const createSellerIntoDB = async (
  file: any,
  // username: string,
  password: string,
  payload: TSeller,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set seller role
  userData.role = 'seller';
  //set manager email
  userData.email = payload.email;
  userData.username = payload.username;

  // console.log('User data from backend = ', payload);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateSellerId();
    // console.log('generateSellerId = ', userData);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    // console.log('new user = ', newUser);

    //create a seller
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Seller');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a manager (transaction-2)
    const newSeller = await Seller.create([payload], { session });

    if (!newSeller.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Seller');
    }

    await session.commitTransaction();
    await session.endSession();

    return newSeller;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createManagerIntoDB = async (
  file: any,
  // username: string,
  password: string,
  payload: TManager,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'manager';
  //set manager email
  userData.email = payload.email;
  userData.username = payload.username;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateManagerId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a manager
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Manager');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a manager (transaction-2)
    const newManager = await Manager.create([payload], { session });

    if (!newManager.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create manager');
    }

    await session.commitTransaction();
    await session.endSession();

    return newManager;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createSellerIntoDB,
  createManagerIntoDB,
  changeStatus,
};
