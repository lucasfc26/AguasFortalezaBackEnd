import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientInfo } from './entities/client-info.entity';
import { PaymentClient } from './entities/payment-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientInfo, PaymentClient])],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
