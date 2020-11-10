import {
  IsOptional,
  Length,
  IsNumber,
  IsEnum,
  IsString,
} from 'class-validator';
import { ProductStatus } from '../interfaces/product.interface';

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(3, 500)
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  quantity?: number;

  @IsOptional()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  price?: number;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}
