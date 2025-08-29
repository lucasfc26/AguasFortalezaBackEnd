import { IsNotEmpty, IsNumber } from 'class-validator';

export class ServicesCoordinatesDto {
  @IsNumber()
  @IsNotEmpty()
  latitude?: number;

  @IsNumber()
  @IsNotEmpty()
  longitude?: number;
}
