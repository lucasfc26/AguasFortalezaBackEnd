import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ServicesAddressDto {
  @IsString()
  @IsNotEmpty()
  street?: string;

  @IsString()
  @IsNotEmpty()
  number?: string;

  @IsString()
  @IsNotEmpty()
  neighborhood?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsNumber()
  @IsNotEmpty()
  latitude?: number;

  @IsNumber()
  @IsNotEmpty()
  longitude?: number;
}
