import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'payment_client' })
export class PaymentClient {
  @PrimaryColumn({ name: 'uuid_payment', type: 'uuid' })
  uuidPayment: string;

  @Index()
  @Column({ name: 'uuid_client', type: 'uuid' })
  uuidClient: string;

  @Column({ name: 'card_name_client' })
  cardNameClient: string;

  @Column({ name: 'card_number_client' })
  cardNumberClient: string;

  @Column({ name: 'card_data_client' })
  cardDataClient: string;

  @Column({ name: 'card_code_client' })
  cardCodeClient: string;

  @Column({ name: 'cpf_client', length: 14 })
  cpfClient: string;
}
