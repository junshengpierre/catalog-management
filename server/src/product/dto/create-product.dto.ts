import { IsDefined, Length, IsNumber, IsEnum, IsString } from 'class-validator';
import { ProductStatus } from '../interfaces/product.interface';

export class CreateProductDTO {
  @IsDefined()
  @IsString()
  @Length(0, 100)
  title: string;

  @IsDefined()
  @IsString()
  @Length(0, 500)
  description: string;

  // TODO: Add validation
  image: string;

  @IsDefined()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  quantity: number;

  @IsDefined()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  price: number;

  @IsDefined()
  @IsEnum(ProductStatus)
  status: ProductStatus;
}
