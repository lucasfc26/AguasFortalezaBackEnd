import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class ClientSignupDto {
  @IsString()
  @IsNotEmpty()
  userClient: string;

  @IsString()
  @Length(6, 100)
  passwordClient: string;

  @IsOptional()
  @IsString()
  validationTokenClient?: string;

  @IsString()
  @IsNotEmpty()
  nameClient: string;

  @IsEmail()
  emailClient: string;

  @IsString()
  @IsNotEmpty()
  cpfClient: string;

  @IsOptional()
  @IsString()
  addressClient?: string;

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitudeClient?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitudeClient?: number;

  @IsOptional()
  @IsString()
  phoneClient?: string;
}
