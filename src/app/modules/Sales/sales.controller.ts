import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SalesServices } from './sales.service';

const createSales = catchAsync(async (req, res) => {
  const result = await SalesServices.createSalesIntoDB(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is sold succesfully',
    data: result,
  });
});

const getAllSales = catchAsync(async (req, res) => {
  const result = await SalesServices.getAllSalesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales list are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleSales = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SalesServices.getSingleSalesFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales is retrieved succesfully',
    data: result,
  });
});

export const SalesControllers = {
  createSales,
  getSingleSales,
  getAllSales,
};
