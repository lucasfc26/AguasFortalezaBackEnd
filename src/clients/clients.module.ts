import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientInfo } from './entities/client-info.entity';
import { PaymentClient } from './entities/payment-client.entity';
import { SharedModule } from '../shared/shared.module';
import { MapsModule } from '../maps/maps.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientInfo, PaymentClient]),
    SharedModule,
    MapsModule,
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
