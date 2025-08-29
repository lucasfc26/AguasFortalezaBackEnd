import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'client_info' })
export class ClientInfo {
  @PrimaryColumn({ name: 'uuid_client', type: 'uuid' })
  uuidClient: string;

  @Column({ name: 'user_client', type: 'varchar', unique: true })
  userClient: string;

  @Column({ name: 'password_client', type: 'varchar' })
  passwordClient: string;

  @Column({ name: 'validation_token_client', type: 'varchar', nullable: true })
  validationTokenClient: string | null;

  @Column({ name: 'name_client', type: 'varchar' })
  nameClient: string;

  @Column({ name: 'email_client', type: 'varchar', unique: true })
  emailClient: string;

  @Column({ name: 'cpf_client', type: 'varchar', length: 14 })
  cpfClient: string;

  @Column({ name: 'address_client', type: 'varchar', nullable: true })
  addressClient: string | null;

  @Column({
    name: 'latitude_client',
    type: 'decimal',
    precision: 10,
    scale: 8,
    nullable: true,
  })
  latitudeClient: number | null;

  @Column({
    name: 'longitude_client',
    type: 'decimal',
    precision: 11,
    scale: 8,
    nullable: true,
  })
  longitudeClient: number | null;

  @Column({ name: 'cont_bought_client', type: 'int', default: 0 })
  contBoughtClient: number;

  @Column({
    name: 'rate_client_client',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
  })
  rateClientClient: number;

  @Column({ name: 'phone_client', type: 'varchar', nullable: true })
  phoneClient: string | null;
}
