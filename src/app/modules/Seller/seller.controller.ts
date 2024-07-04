import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SellerServices } from './seller.service';

const getSingleSeller = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SellerServices.getSingleSellerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller is retrieved succesfully',
    data: result,
  });
});

const getAllSellers = catchAsync(async (req, res) => {
  const result = await SellerServices.getAllSellersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sellers are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateSeller = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { seller } = req.body;
  const result = await SellerServices.updateSellerIntoDB(id, seller);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller is updated succesfully',
    data: result,
  });
});

const deleteSeller = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SellerServices.deleteSellerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller is deleted succesfully',
    data: result,
  });
});

export const SellerControllers = {
  getAllSellers,
  getSingleSeller,
  deleteSeller,
  updateSeller,
};
