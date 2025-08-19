import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from './entities/delivery.entity';
import { CreateDeliveryDto } from './dtos/create-delivery.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepo: Repository<Delivery>,
  ) {}

  create(dto: CreateDeliveryDto) {
    const delivery = this.deliveryRepo.create({
      uuidDelivery: randomUUID(),
      uuidClient: dto.uuidClient,
      uuidCompany: dto.uuidCompany,
      product: dto.product,
      typePayment: dto.typePayment,
    });
    return this.deliveryRepo.save(delivery);
  }

  findByClient(uuidClient: string) {
    return this.deliveryRepo.find({ where: { uuidClient } });
  }
}
