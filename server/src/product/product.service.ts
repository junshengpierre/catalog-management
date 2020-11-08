import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const newProduct = await this.productModel.create(createProductDTO);
    return newProduct.save();
  }

  async getProduct(productID): Promise<Product> {
    const product = await this.productModel.findById(productID).exec();
    return product;
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products;
  }

  async editProduct(
    productID,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    const editedProduct = await this.productModel.findByIdAndUpdate(
      productID,
      createProductDTO,
      { new: true },
    );
    return editedProduct;
  }

  async deleteProduct(postID): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndRemove(postID);
    return deletedProduct;
  }
}
