import { IsNotEmpty, IsString } from 'class-validator';

export class ClientForgotPassDto {
  @IsString()
  @IsNotEmpty()
  userClient: string;

  @IsString()
  @IsNotEmpty()
  passwordClient: string;
}
