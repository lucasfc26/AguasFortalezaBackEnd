import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { CompaniesModule } from './companies/companies.module';
import { ProductsModule } from './products/products.module';
import { DeliveriesModule } from './deliveries/deliveries.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      //host: process.env.DB_HOST || 'localhost',
      //port: Number(process.env.DB_PORT || 5432),
      //username: process.env.DB_USER || 'postgres',
      //password: process.env.DB_PASSWORD || 'admin',
      //database: process.env.DB_NAME || 'aguafortaleza',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'aguafortaleza',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClientsModule,
    CompaniesModule,
    ProductsModule,
    DeliveriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
