import { IsNotEmpty, IsString } from 'class-validator';

export class MapsConvertionDto {
  latitude?: number;

  longitude?: number;

  @IsString()
  @IsNotEmpty()
  formattedAddress: string;
}
