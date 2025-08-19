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

  @Column({ name: 'product', type: 'varchar' })
  product: string;

  @Column({ name: 'type_payment', type: 'varchar' })
  typePayment: string;
}
