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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ValidateObjectId } from './shared/validate-object-id.pipes';

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

  @Post()
  async addProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const newProduct = await this.productService.addProduct(createProductDTO);
    return res.status(HttpStatus.CREATED).json(newProduct);
  }

  @Patch(':id')
  async editProduct(
    @Res() res,
    @Param('id', new ValidateObjectId()) productID,
    @Body() updateProductDTO: UpdateProductDTO,
  ) {
    const editedProduct = await this.productService.editProduct(
      productID,
      updateProductDTO,
    );
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
    return res.status(HttpStatus.OK).json(deletedProduct);
  }
}
