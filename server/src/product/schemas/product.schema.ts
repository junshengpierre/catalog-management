import * as mongoose from 'mongoose';
import { ProductStatus } from '../interfaces/product.interface';

const ProductSchema = new mongoose.Schema(
  {
    title: { required: true, type: String },
    description: String,
    image: { type: String, default: null },
    quantity: { required: true, type: Number },
    price: { required: true, type: Number },
    status: {
      required: true,
      type: String,
      enum: Object.values(ProductStatus).map((value) => value.toString()),
    },
  },
  { timestamps: true },
);

ProductSchema.set('toJSON', {
  virtuals: true,
});

export { ProductSchema };
