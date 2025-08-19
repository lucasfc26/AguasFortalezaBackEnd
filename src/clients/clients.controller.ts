import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientSignupDto } from './dtos/client-signup.dto';
import { ClientLoginDto } from './dtos/client-login.dto';
import { CreatePaymentClientDto } from './dtos/create-payment-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('signup')
  signup(@Body() dto: ClientSignupDto) {
    return this.clientsService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: ClientLoginDto) {
    return this.clientsService.login(dto);
  }

  @Post('payment')
  createPayment(@Body() dto: CreatePaymentClientDto) {
    return this.clientsService.addPayment(dto);
  }

  @Get('list')
  getClientsList() {
    return this.clientsService.getClientsList();
  }
}
