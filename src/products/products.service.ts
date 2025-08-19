import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  create(dto: CreateProductDto) {
    const product = this.productRepo.create({
      uuidProduct: randomUUID(),
      nameProduct: dto.nameProduct,
      typeProduct: dto.typeProduct,
      qtdProduct: dto.qtdProduct,
      uuidCompany: dto.uuidCompany,
      priceProduct: dto.priceProduct,
    });
    return this.productRepo.save(product);
  }

  findByCompany(uuidCompany: string) {
    return this.productRepo.find({ where: { uuidCompany } });
  }
}
