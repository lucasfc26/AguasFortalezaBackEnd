import { IsNotEmpty, IsNumber } from 'class-validator';

export class MapsCalculateDto {
  @IsNumber()
  @IsNotEmpty()
  lat1: number;

  @IsNumber()
  @IsNotEmpty()
  lon1: number;

  @IsNumber()
  @IsNotEmpty()
  lat2: number;

  @IsNumber()
  @IsNotEmpty()
  lon2: number;
}
