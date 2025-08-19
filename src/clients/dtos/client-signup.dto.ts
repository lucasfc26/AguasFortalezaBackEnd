import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
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
  @IsString()
  phoneClient?: string;
}
