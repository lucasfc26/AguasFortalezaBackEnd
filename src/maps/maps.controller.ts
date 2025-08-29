import { Controller, Get, Body, Post, Query } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapsConvertionDto } from './dtos/maps-convertion.dto';
import { MapsValidateDto } from './dtos/maps.validate.dto';
import { MapsCalculateDto } from './dtos/maps.calculate.dto';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  /**
   * Converte um endereço em coordenadas geográficas
   */
  @Get('geocode')
  async geocode(@Query('address') dto: MapsConvertionDto) {
    return this.mapsService.geocodeAddress(dto.formattedAddress);
  }

  /**
   * Valida se as coordenadas são válidas
   */
  @Post('validate-coordinates')
  validateCoordinates(@Body() dto: MapsValidateDto): {
    isValid: boolean;
  } {
    const isValid = this.mapsService.validateCoordinates(
      dto.latitude,
      dto.longitude,
    );
    return { isValid };
  }

  /**
   * Calcula a distância entre duas coordenadas
   */
  @Post('calculate-distance')
  calculateDistance(@Body() dto: MapsCalculateDto): {
    distance: number;
  } {
    const distance = this.mapsService.calculateDistance(
      dto.lat1,
      dto.lon1,
      dto.lat2,
      dto.lon2,
    );
    return { distance };
  }
}
