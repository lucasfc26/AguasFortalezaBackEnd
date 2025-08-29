import { Injectable } from '@nestjs/common';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Address {
  street?: string;
  number?: string;
  neighborhood?: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
}

@Injectable()
export class DistanceService {
  /**
   * Calcula a distância entre duas coordenadas usando a fórmula de Haversine
   * @param coord1 Primeira coordenada (latitude, longitude)
   * @param coord2 Segunda coordenada (latitude, longitude)
   * @returns Distância em quilômetros
   */
  calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    const R = 6371; // Raio da Terra em quilômetros
    const dLat = this.toRadians(coord2.latitude - coord1.latitude);
    const dLon = this.toRadians(coord2.longitude - coord1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(coord1.latitude)) *
        Math.cos(this.toRadians(coord2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 100) / 100; // Arredonda para 2 casas decimais
  }

  /**
   * Converte graus para radianos
   */
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Verifica se duas coordenadas estão dentro de uma distância máxima
   * @param coord1 Primeira coordenada
   * @param coord2 Segunda coordenada
   * @param maxDistance Distância máxima em quilômetros
   * @returns true se estiver dentro da distância máxima
   */
  isWithinDistance(
    coord1: Coordinates,
    coord2: Coordinates,
    maxDistance: number,
  ): boolean {
    const distance = this.calculateDistance(coord1, coord2);
    return distance <= maxDistance;
  }

  /**
   * Calcula o tempo estimado de entrega baseado na distância
   * @param distance Distância em quilômetros
   * @returns Tempo estimado em minutos
   */
  estimateDeliveryTime(distance: number): number {
    // Estimativa: 15 minutos para distâncias até 5km, +3 min por km adicional
    if (distance <= 5) {
      return 15;
    }
    return Math.round(15 + (distance - 5) * 3);
  }

  /**
   * Calcula o custo de entrega baseado na distância
   * @param distance Distância em quilômetros
   * @returns Custo em reais
   */
  calculateDeliveryCost(distance: number): number {
    // Taxa base de R$ 5,00 + R$ 2,00 por km
    const baseRate = 5.0;
    const perKmRate = 2.0;
    return Math.round((baseRate + distance * perKmRate) * 100) / 100;
  }
}
