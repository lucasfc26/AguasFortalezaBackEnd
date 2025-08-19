import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  @IsNotEmpty()
  uuidClient: string;

  @IsString()
  @IsNotEmpty()
  uuidCompany: string;

  @IsString()
  @IsNotEmpty()
  product: string;

  @IsString()
  @IsNotEmpty()
  typePayment: string;
}
