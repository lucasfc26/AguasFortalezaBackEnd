export class DistanceResultDto {
  clientId: string;
  companyId: string;
  distance: number; // em quilômetros
  estimatedDeliveryTime: number; // em minutos
  deliveryCost: number; // em reais
  isWithinRange: boolean;
  clientAddress?: string;
  companyAddress?: string;
  clientCoordinates?: {
    latitude: number;
    longitude: number;
  };
  companyCoordinates?: {
    latitude: number;
    longitude: number;
  };
}
