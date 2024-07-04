import { Types } from 'mongoose';

export type TSales = {
  buyerName: string;
  price?: number;
  productQuantity: number;
  saleDate?: string;
  productId: Types.ObjectId;
  soldBy?: Types.ObjectId;
};
