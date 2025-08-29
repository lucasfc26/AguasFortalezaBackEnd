import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientSignupDto } from './dtos/client-signup.dto';
import { ClientLoginDto } from './dtos/client-login.dto';
import { CreatePaymentClientDto } from './dtos/create-payment-client.dto';
import { ClientForgotPassDto } from './dtos/client-forgot-pass';
import { CalculateDistanceDto } from './dtos/calculate-distance.dto';

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

  @Post('forgot-password')
  forgotPass(@Body() dto: ClientForgotPassDto) {
    return this.clientsService.forgotPass(dto);
  }

  @Post('add-payment')
  addPayment(@Body() dto: CreatePaymentClientDto) {
    return this.clientsService.addPayment(dto);
  }

  @Get('list')
  getClientsList() {
    return this.clientsService.getClientsList();
  }

  @Post('calculate-distance')
  calculateDistance(@Body() dto: CalculateDistanceDto) {
    return this.clientsService.calculateDistanceToCompany(dto);
  }

  /**
   * Atualiza as coordenadas de um cliente manualmente
   */
  @Patch(':id/coordinates')
  updateCoordinates(
    @Param('id') clientId: string,
    @Body() body: { latitude: number; longitude: number },
  ) {
    return this.clientsService.updateClientCoordinates(
      clientId,
      body.latitude,
      body.longitude,
    );
  }

  /**
   * Atualiza o endereço de um cliente e faz geocoding automático
   */
  @Patch(':id/address')
  updateAddress(
    @Param('id') clientId: string,
    @Body() body: { address: string },
  ) {
    return this.clientsService.updateClientAddress(clientId, body.address);
  }
}
