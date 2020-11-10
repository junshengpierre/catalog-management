import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Patch,
  Post,
  Param,
  Res,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ValidateObjectId } from './shared/validate-object-id.pipes';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

export const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get(':id')
  async getProduct(@Res() res, @Param('id', new ValidateObjectId()) productId) {
    const product = await this.productService.getProduct(productId);
    if (!product) {
      throw new NotFoundException('Product does not exist.');
    }
    return res.status(HttpStatus.OK).json(product);
  }

  // TODO: Implement file size and file extension validation
  @Post()
  @UseInterceptors(FileInterceptor('file', storage))
  async addProduct(
    @Res() res,
    @UploadedFile() file,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const newProduct = await this.productService.addProduct({
      ...createProductDTO,
      ...(file && {
        image: `${process.env.DOMAIN_URI}/images/${file.filename}`,
      }),
    });
    return res.status(HttpStatus.CREATED).json(newProduct);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', storage))
  async editProduct(
    @Res() res,
    @Param('id', new ValidateObjectId()) productID,
    @UploadedFile() file,
    @Body() updateProductDTO: UpdateProductDTO,
  ) {
    const editedProduct = await this.productService.editProduct(productID, {
      ...updateProductDTO,
      ...(file && {
        image: `${process.env.DOMAIN_URI}/images/${file.filename}`,
      }),
    });
    if (!editedProduct) {
      throw new NotFoundException('Product does not exist.');
    }
    return res.status(HttpStatus.OK).json(editedProduct);
  }

  @Delete(':id')
  async deleteProduct(
    @Res() res,
    @Param('id', new ValidateObjectId()) productID,
  ) {
    const deletedProduct = await this.productService.deleteProduct(productID);
    if (!deletedProduct) {
      throw new NotFoundException('Product does not exist.');
    }

    // TODO: Delete image file of deleted product
    return res.status(HttpStatus.OK).json(deletedProduct);
  }
}
