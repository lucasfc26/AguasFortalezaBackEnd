import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dtos/create-delivery.dto';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  create(@Body() dto: CreateDeliveryDto) {
    return this.deliveriesService.create(dto);
  }

  @Get('client/:uuidClient')
  findByClient(@Param('uuidClient') uuidClient: string) {
    return this.deliveriesService.findByClient(uuidClient);
  }
}
