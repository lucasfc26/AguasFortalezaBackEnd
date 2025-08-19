import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentClientDto {
  @IsString()
  @IsNotEmpty()
  uuidClient: string;

  @IsString()
  @IsNotEmpty()
  cardNameClient: string;

  @IsString()
  @IsNotEmpty()
  cardNumberClient: string;

  @IsString()
  @IsNotEmpty()
  cardDataClient: string;

  @IsString()
  @IsNotEmpty()
  cardCodeClient: string;

  @IsString()
  @IsNotEmpty()
  cpfClient: string;
}
