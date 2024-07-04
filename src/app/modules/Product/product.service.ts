import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ProductsSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  // console.log('product =', payload);
  const available = payload.quantity;
  if (available === 0) {
    const isAvailable = false;
    const payloadWithisAvailable = {
      ...payload,
      isAvailable,
    };
    const result = await Product.create(payloadWithisAvailable);
    return result;
  }

  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Product.find({ isDeleted: false }),
    query,
  )
    .search(ProductsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;

  // console.log('result for get all products = ', result);
  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const { ...productRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //step1: basic product info update
    const updatedBasicProductInfo = await Product.findByIdAndUpdate(
      id,
      productRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    // console.log('Updating product = ', updatedBasicProductInfo);

    if (!updatedBasicProductInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update product');
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Product.findById(id);

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update product');
  }
};

const deleteProductFromDB = async (id: string) => {
  // console.log('Delete product =', id);
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

// Bulk Delete product by updating isDeleted field
const bulkDeleteProductFromDB = async (ids: string[]) => {
  // console.log('bulk ids = ', ids);
  const result = await Product.updateMany(
    { _id: { $in: ids } },
    { $set: { isDeleted: true } },
  );
  // console.log('bulk delete from service = ', result);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  bulkDeleteProductFromDB,
};
