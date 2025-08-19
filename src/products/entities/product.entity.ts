import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryColumn({ name: 'uuid_product', type: 'uuid' })
  uuidProduct: string;

  @Column({ name: 'name_product' })
  nameProduct: string;

  @Column({ name: 'type_product' })
  typeProduct: string;

  @Column({ name: 'qtd_product', type: 'int' })
  qtdProduct: number;

  @Index()
  @Column({ name: 'uuid_company', type: 'uuid' })
  uuidCompany: string;

  @Column({ name: 'price_product', type: 'numeric', precision: 10, scale: 2 })
  priceProduct: string;
}
