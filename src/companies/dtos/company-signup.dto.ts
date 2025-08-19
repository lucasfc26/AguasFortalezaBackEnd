import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CompanySignupDto {
  @IsString()
  @IsNotEmpty()
  userCompany: string;

  @IsString()
  @Length(6, 100)
  passwordCompany: string;

  @IsOptional()
  @IsString()
  validationTokenCompany?: string;

  @IsString()
  @IsNotEmpty()
  nameCompany: string;

  @IsEmail()
  emailCompany: string;

  @IsString()
  @IsNotEmpty()
  cnpjCompany: string;

  @IsOptional()
  @IsString()
  addressCompany?: string;

  @IsOptional()
  @IsBoolean()
  delivery?: boolean;

  @IsOptional()
  @IsDateString()
  timeOpenCompany?: string;

  @IsOptional()
  @IsDateString()
  timeCloseCompany?: string;

  @IsOptional()
  @IsString()
  phoneCompany?: string;
}
