import { IsNotEmpty, IsString } from 'class-validator';

export class CompanyLoginDto {
  @IsString()
  @IsNotEmpty()
  userCompany: string;

  @IsString()
  @IsNotEmpty()
  passwordCompany: string;
}
