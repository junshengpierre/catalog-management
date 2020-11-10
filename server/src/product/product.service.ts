import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

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
    const products = await this.productModel
      .find()
      .sort({ createdAt: 'desc' })
      .exec();
    return products;
  }

  async editProduct(
    productID,
    updateProductDTO: UpdateProductDTO,
  ): Promise<Product> {
    const editedProduct = await this.productModel.findByIdAndUpdate(
      productID,
      updateProductDTO,
      { new: true },
    );
    return editedProduct;
  }

  async deleteProduct(postID): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndRemove(postID);
    return deletedProduct;
  }
}
