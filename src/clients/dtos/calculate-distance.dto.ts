import { IsNotEmpty, IsUUID, IsOptional, IsNumber, Min } from 'class-validator';

export class CalculateDistanceDto {
  @IsNotEmpty()
  @IsUUID()
  clientId: string;

  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxDistance?: number; // Distância máxima em km para filtrar resultados
}
