import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientInfo } from './entities/client-info.entity';
import { PaymentClient } from './entities/payment-client.entity';
import { ClientSignupDto } from './dtos/client-signup.dto';
import { ClientLoginDto } from './dtos/client-login.dto';
import { CreatePaymentClientDto } from './dtos/create-payment-client.dto';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientInfo)
    private readonly clientRepo: Repository<ClientInfo>,
    @InjectRepository(PaymentClient)
    private readonly paymentRepo: Repository<PaymentClient>,
  ) {}

  async signup(dto: ClientSignupDto) {
    const passwordHash = await bcrypt.hash(dto.passwordClient, 10);
    const client = this.clientRepo.create({
      uuidClient: randomUUID(),
      userClient: dto.userClient,
      passwordClient: passwordHash,
      validationTokenClient: dto.validationTokenClient ?? null,
      nameClient: dto.nameClient,
      emailClient: dto.emailClient,
      cpfClient: dto.cpfClient,
      addressClient: dto.addressClient ?? null,
      contBoughtClient: 0,
      rateClientClient: 0,
      phoneClient: dto.phoneClient ?? null,
    });
    await this.clientRepo.save(client);
    return { uuidClient: client.uuidClient, userClient: client.userClient };
  }

  async login(dto: ClientLoginDto) {
    const client = await this.clientRepo.findOne({
      where: { userClient: dto.userClient },
    });
    if (!client) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(dto.passwordClient, client.passwordClient);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return { uuidClient: client.uuidClient, userClient: client.userClient };
  }

  async addPayment(dto: CreatePaymentClientDto) {
    const payment = this.paymentRepo.create({
      uuidPayment: randomUUID(),
      uuidClient: dto.uuidClient,
      cardNameClient: dto.cardNameClient,
      cardNumberClient: dto.cardNumberClient,
      cardDataClient: dto.cardDataClient,
      cardCodeClient: dto.cardCodeClient,
      cpfClient: dto.cpfClient,
    });
    return this.paymentRepo.save(payment);
  }
}
