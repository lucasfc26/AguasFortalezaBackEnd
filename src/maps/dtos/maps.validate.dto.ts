import { IsNotEmpty, IsNumber } from 'class-validator';

export class MapsValidateDto {
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
