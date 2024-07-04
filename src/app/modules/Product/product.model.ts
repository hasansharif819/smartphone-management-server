import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  operatingSystem: {
    type: String,
    required: true,
  },
  screenSize: {
    type: Number,
    required: true,
  },
  storageCapacity: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  brand: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Product = model<TProduct>('Product', productSchema);
