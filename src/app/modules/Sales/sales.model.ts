import { Schema, model } from 'mongoose';
import { TSales } from './sales.interface';

const salesSchema = new Schema<TSales>(
  {
    buyerName: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    saleDate: {
      type: String,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    soldBy: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
    },
  },
  {
    timestamps: true,
  },
);

export const Sales = model<TSales>('Sales', salesSchema);
