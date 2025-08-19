import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'delivery' })
export class Delivery {
  @PrimaryColumn({ name: 'uuid_delivery', type: 'uuid' })
  uuidDelivery: string;

  @Index()
  @Column({ name: 'uuid_client', type: 'uuid' })
  uuidClient: string;

  @Index()
  @Column({ name: 'uuid_company', type: 'uuid' })
  uuidCompany: string;

  @Column({ name: 'product' })
  product: string;

  @Column({ name: 'type_payment' })
  typePayment: string;
}
