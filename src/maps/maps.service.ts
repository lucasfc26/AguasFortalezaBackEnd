import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
//import { MapsConvertionDto } from './dtos/maps-convertion.dto';

@Injectable()
export class MapsService {
  private readonly apiKey = process.env.GOOGLE_MAPS_API_KEY;

  /**
   * Converte um endereço em coordenadas geográficas usando Google Maps API
   * @param address Endereço completo para geocodificar
   * @returns Objeto com latitude, longitude e endereço formatado
   */
  async geocodeAddress(address: string) {
    if (!this.apiKey) {
      throw new BadRequestException('Google Maps API key não configurada');
    }

    if (!address || address.trim().length === 0) {
      throw new BadRequestException('Endereço é obrigatório');
    }

    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json`;
      const response = await axios.get(url, {
        params: {
          address: address.trim(),
          key: this.apiKey,
          language: 'pt-BR',
          region: 'BR',
        },
        timeout: 10000,
      });

      if (response.data.status === 'ZERO_RESULTS') {
        throw new BadRequestException('Endereço não encontrado');
      }

      if (response.data.status !== 'OK') {
        throw new InternalServerErrorException(
          `Erro no geocoding: ${response.data.status}`,
        );
      }

      const result = response.data.results[0];
      const location = result.geometry.location;
      const formattedAddress = result.formatted_address;

      return {
        latitude: location.lat,
        longitude: location.lng,
        formattedAddress,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new InternalServerErrorException(
            'Timeout na requisição para Google Maps API',
          );
        }
        if (error.response?.status === 403) {
          throw new BadRequestException(
            'Chave da API do Google Maps inválida ou sem permissões',
          );
        }
        if (error.response?.status === 429) {
          throw new InternalServerErrorException(
            'Limite de requisições da API do Google Maps excedido',
          );
        }
      }

      throw new InternalServerErrorException(
        'Erro interno no serviço de geocoding',
      );
    }
  }

  /**
   * Valida se as coordenadas estão dentro dos ranges válidos
   */
  validateCoordinates(latitude: number, longitude: number): boolean {
    return (
      latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180
    );
  }

  /**
   * Calcula a distância entre duas coordenadas
   */
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371;
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 100) / 100;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
