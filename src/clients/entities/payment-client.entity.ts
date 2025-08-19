import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'payment_client' })
export class PaymentClient {
  @PrimaryColumn({ name: 'uuid_payment', type: 'uuid' })
  uuidPayment: string;

  @Index()
  @Column({ name: 'uuid_client', type: 'uuid' })
  uuidClient: string;

  @Column({ name: 'card_name_client', type: 'varchar' })
  cardNameClient: string;

  @Column({ name: 'card_number_client', type: 'varchar' })
  cardNumberClient: string;

  @Column({ name: 'card_data_client', type: 'varchar' })
  cardDataClient: string;

  @Column({ name: 'card_code_client', type: 'varchar' })
  cardCodeClient: string;

  @Column({ name: 'cpf_client', type: 'varchar', length: 14 })
  cpfClient: string;
}
