import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ManagerServices } from './manager.service';

const getSingleManager = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ManagerServices.getSingleManagerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Manager is retrieved succesfully',
    data: result,
  });
});

const getAllManagers = catchAsync(async (req, res) => {
  const result = await ManagerServices.getAllManagersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Managers are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateManager = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { manager } = req.body;
  const result = await ManagerServices.updateManagerIntoDB(id, manager);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Manager is updated succesfully',
    data: result,
  });
});

const deleteManager = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ManagerServices.deleteManagerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Manager is deleted succesfully',
    data: result,
  });
});

export const ManagerControllers = {
  getAllManagers,
  getSingleManager,
  deleteManager,
  updateManager,
};
