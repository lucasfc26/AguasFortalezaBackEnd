import { Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';

@Module({
  controllers: [MapsController],
  providers: [MapsService],
  exports: [MapsService], // Exporta o serviço para uso em outros módulos
})
export class MapsModule {}
