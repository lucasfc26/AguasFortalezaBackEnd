import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientInfo } from './entities/client-info.entity';
import { PaymentClient } from './entities/payment-client.entity';
import { ClientSignupDto } from './dtos/client-signup.dto';
import { ClientLoginDto } from './dtos/client-login.dto';
import { CreatePaymentClientDto } from './dtos/create-payment-client.dto';
import { CalculateDistanceDto } from './dtos/calculate-distance.dto';
import { DistanceResultDto } from './dtos/distance-result.dto';
import {
  DistanceService,
  Coordinates,
} from '../shared/services/distance.service';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { ClientForgotPassDto } from './dtos/client-forgot-pass';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientInfo)
    private readonly clientRepo: Repository<ClientInfo>,
    @InjectRepository(PaymentClient)
    private readonly paymentRepo: Repository<PaymentClient>,
    private readonly distanceService: DistanceService,
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
      latitudeClient: dto.latitudeClient ?? null,
      longitudeClient: dto.longitudeClient ?? null,
      contBoughtClient: 0,
      rateClientClient: 0,
      phoneClient: dto.phoneClient,
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

  async forgotPass(dto: ClientForgotPassDto) {
    const client = await this.clientRepo.findOne({
      where: { userClient: dto.userClient },
    });
    if (!client) throw new NotFoundException('Invalid credentials');
    const passwordHash = await bcrypt.hash(dto.passwordClient, 10);
    client.passwordClient = passwordHash;
    await this.clientRepo.save(client);
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

  async getClientsList() {
    const clients = await this.clientRepo.find();
    return clients;
  }

  async calculateDistanceToCompany(
    dto: CalculateDistanceDto,
  ): Promise<DistanceResultDto> {
    const client = await this.clientRepo.findOne({
      where: { uuidClient: dto.clientId },
    });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    // Mock da empresa para demonstração
    // Em produção, você deve buscar a empresa do repositório
    const mockCompany = {
      uuidCompany: dto.companyId,
      latitudeCompany: -23.5505, // São Paulo
      longitudeCompany: -46.6333,
      addressCompany: 'Endereço da empresa',
    };

    // Verificar se ambos têm coordenadas
    if (!client.latitudeClient || !client.longitudeClient) {
      throw new NotFoundException('Coordenadas não disponíveis para o cliente');
    }

    const clientCoords: Coordinates = {
      latitude: client.latitudeClient,
      longitude: client.longitudeClient,
    };

    const companyCoords: Coordinates = {
      latitude: mockCompany.latitudeCompany,
      longitude: mockCompany.longitudeCompany,
    };

    const distance = this.distanceService.calculateDistance(
      clientCoords,
      companyCoords,
    );
    const estimatedDeliveryTime =
      this.distanceService.estimateDeliveryTime(distance);
    const deliveryCost = this.distanceService.calculateDeliveryCost(distance);
    const isWithinRange = dto.maxDistance
      ? this.distanceService.isWithinDistance(
          clientCoords,
          companyCoords,
          dto.maxDistance,
        )
      : true;

    return {
      clientId: client.uuidClient,
      companyId: mockCompany.uuidCompany,
      distance,
      estimatedDeliveryTime,
      deliveryCost,
      isWithinRange,
      clientAddress: client.addressClient || undefined,
      companyAddress: mockCompany.addressCompany,
      clientCoordinates: clientCoords,
      companyCoordinates: companyCoords,
    };
  }

  /**
   * Atualiza as coordenadas de um cliente manualmente
   */
  async updateClientCoordinates(
    clientId: string,
    latitude: number,
    longitude: number,
  ): Promise<ClientInfo> {
    // Validação básica das coordenadas
    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      throw new BadRequestException('Coordenadas inválidas');
    }

    const client = await this.clientRepo.findOne({
      where: { uuidClient: clientId },
    });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    client.latitudeClient = latitude;
    client.longitudeClient = longitude;

    return await this.clientRepo.save(client);
  }

  /**
   * Atualiza o endereço de um cliente
   */
  async updateClientAddress(
    clientId: string,
    newAddress: string,
  ): Promise<ClientInfo> {
    const client = await this.clientRepo.findOne({
      where: { uuidClient: clientId },
    });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    client.addressClient = newAddress;

    // Por enquanto, remove as coordenadas quando o endereço é alterado
    // Em uma implementação completa, você faria geocoding aqui
    client.latitudeClient = null;
    client.longitudeClient = null;

    return await this.clientRepo.save(client);
  }
}
