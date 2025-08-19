import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  nameProduct: string;

  @IsString()
  @IsNotEmpty()
  typeProduct: string;

  @IsNumber()
  @IsPositive()
  qtdProduct: number;

  @IsString()
  @IsNotEmpty()
  uuidCompany: string;

  @IsString()
  @IsNotEmpty()
  priceProduct: string;
}
