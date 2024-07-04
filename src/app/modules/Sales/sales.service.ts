import QueryBuilder from '../../builder/QueryBuilder';
import { SalesSearchableFields } from './sales.constant';
import { TSales } from './sales.interface';
import { Sales } from './sales.model';
import { JwtPayload } from 'jsonwebtoken';
import { Seller } from '../Seller/seller.model';
import { Product } from '../Product/product.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Manager } from '../Manager/manager.model';
import { User } from '../User/user.model';

const createSalesIntoDB = async (userData: JwtPayload, payload: TSales) => {
  const seller = userData.userId;
  const userRole = userData.role;

  let user;

  if (userRole == 'seller') {
    user = await Seller.findOne({ id: seller });
  }
  if (userRole == 'manager') {
    user = await Manager.findOne({ id: seller });
  }
  if (userRole == 'super-admin') {
    user = await User.findOne({ id: seller });
  }

  const sellerId = user?._id?.toString();
  // console.log('Seller data = ', sellerId);

  const productId = payload.productId;
  const product = await Product.findOne({ _id: productId });
  // const price = product?.price;

  const stock = product?.quantity;
  const productQuantity = payload.productQuantity;

  if ((stock as number) < productQuantity) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Not Enough Stock');
  }

  const price = (product?.price as number) * payload.productQuantity;

  const payloadWithSeller = {
    ...payload,
    price,
    soldBy: sellerId,
  };
  // console.log('seller Id = ', payloadWithSeller);

  const result = await Sales.create(payloadWithSeller);
  // Update product quantity
  if (result) {
    await Product.findOneAndUpdate(
      { _id: productId },
      { $inc: { quantity: -productQuantity } }, // Subtract sold quantity from the current quantity
    );

    // Check if the new quantity is 0
    const updatedProduct = await Product.findOne({ _id: productId });
    if (updatedProduct?.quantity === 0) {
      // If the new quantity is 0, update isAvailable field
      await Product.findOneAndUpdate(
        { _id: productId },
        { isAvailable: false },
      );
    }
  }

  return result;
};

const getAllSalesFromDB = async (query: Record<string, unknown>) => {
  const salesQuery = new QueryBuilder(
    Sales.find().populate('productId').populate('soldBy'),
    query,
  )
    .search(SalesSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await salesQuery.modelQuery;
  const meta = await salesQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleSalesFromDB = async (id: string) => {
  const result = await Sales.findById(id)
    .populate('productId')
    .populate('soldBy');
  return result;
};

export const SalesServices = {
  createSalesIntoDB,
  getAllSalesFromDB,
  getSingleSalesFromDB,
};
