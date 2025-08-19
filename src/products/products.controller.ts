import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get('company/:uuidCompany')
  findByCompany(@Param('uuidCompany') uuidCompany: string) {
    return this.productsService.findByCompany(uuidCompany);
  }
}
