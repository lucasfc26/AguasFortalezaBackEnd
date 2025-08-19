import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'client_info' })
export class ClientInfo {
  @PrimaryColumn({ name: 'uuid_client', type: 'uuid' })
  uuidClient: string;

  @Column({ name: 'user_client', unique: true })
  userClient: string;

  @Column({ name: 'password_client' })
  passwordClient: string;

  @Column({ name: 'validation_token_client', nullable: true })
  validationTokenClient: string | null;

  @Column({ name: 'name_client' })
  nameClient: string;

  @Column({ name: 'email_client', unique: true })
  emailClient: string;

  @Column({ name: 'cpf_client', length: 14 })
  cpfClient: string;

  @Column({ name: 'address_client', nullable: true })
  addressClient: string | null;

  @Column({ name: 'cont_bought_client', type: 'int', default: 0 })
  contBoughtClient: number;

  @Column({ name: 'rate_client_client', type: 'float', default: 0 })
  rateClientClient: number;

  @Column({ name: 'phone_client', nullable: true })
  phoneClient: string | null;
}
