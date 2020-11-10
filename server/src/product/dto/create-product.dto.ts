import {
  IsDefined,
  Length,
  IsNumberString,
  IsEnum,
  IsString,
  IsOptional,
} from 'class-validator';
import { ProductStatus } from '../interfaces/product.interface';

export class CreateProductDTO {
  @IsDefined()
  @IsString()
  @Length(3, 100)
  title: string;

  @IsDefined()
  @IsString()
  @Length(3, 500)
  description: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsDefined()
  @IsNumberString({
    no_symbols: true,
  })
  quantity: number;

  @IsDefined()
  @IsNumberString({
    no_symbols: true,
  })
  price: number;

  @IsDefined()
  @IsEnum(ProductStatus)
  status: ProductStatus;
}
