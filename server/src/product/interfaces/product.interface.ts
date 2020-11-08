import { Document } from 'mongoose';

export enum ProductStatus {
  Public = 'Public',
  Private = 'Private',
}

export interface Product extends Document {
  title: string;
  description: string;
  image?: string;
  quantity: number;
  price: number;
  status: ProductStatus;
}
