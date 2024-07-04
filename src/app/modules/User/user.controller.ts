import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createSeller = catchAsync(async (req, res) => {
  const { password, seller: sellerData } = req.body;

  const result = await UserServices.createSellerIntoDB(
    req.file,
    password,
    sellerData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller is created succesfully',
    data: result,
  });
});

const createManager = catchAsync(async (req, res) => {
  const { password, manager: managerData } = req.body;

  const result = await UserServices.createManagerIntoDB(
    req.file,
    password,
    managerData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Manager is created succesfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  });
});
export const UserControllers = {
  createSeller,
  createManager,
  changeStatus,
};
