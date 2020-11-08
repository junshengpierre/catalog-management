import * as mongoose from 'mongoose';
import { ProductStatus } from '../interfaces/product.interface';

export const ProductSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    quantity: Number,
    price: Number,
    status: {
      type: String,
      enum: Object.values(ProductStatus).map((value) => value.toString()),
    },
  },
  { timestamps: true },
);
