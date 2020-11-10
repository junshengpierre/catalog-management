import {
  IsOptional,
  Length,
  IsNumberString,
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
  @IsNumberString({
    no_symbols: true,
  })
  quantity?: number;

  @IsOptional()
  @IsNumberString({
    no_symbols: true,
  })
  price?: number;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}
