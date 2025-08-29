import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'wholesale_company' })
export class WholesaleCompany {
  @PrimaryColumn({ name: 'uuid_company', type: 'uuid' })
  uuidCompany: string;

  @Column({ name: 'user_company', type: 'varchar', unique: true })
  userCompany: string;

  @Column({ name: 'password_company', type: 'varchar' })
  passwordCompany: string;

  @Column({ name: 'validation_token_company', type: 'varchar', nullable: true })
  validationTokenCompany: string | null;

  @Column({ name: 'name_company', type: 'varchar' })
  nameCompany: string;

  @Column({ name: 'email_company', type: 'varchar', unique: true })
  emailCompany: string;

  @Column({ name: 'cnpj_company', type: 'varchar', unique: true })
  cnpjCompany: string;

  @Column({ name: 'address_company', type: 'varchar', nullable: true })
  addressCompany: string | null;

  @Column({ name: 'latitude_company', type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitudeCompany: number | null;

  @Column({ name: 'longitude_company', type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitudeCompany: number | null;

  @Column({ name: 'cont_sells_company', type: 'int', default: 0 })
  contSellsCompany: number;

  @Column({
    name: 'rate_company',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
  })
  rateCompany: number;

  @Column({ name: 'delivery', type: 'boolean', default: false })
  delivery: boolean;

  @Column({ name: 'time_open_company', type: 'timestamp', nullable: true })
  timeOpenCompany: Date | null;

  @Column({ name: 'time_close_company', type: 'timestamp', nullable: true })
  timeCloseCompany: Date | null;

  @Column({ name: 'phone_company', type: 'varchar', nullable: true })
  phoneCompany: string | null;
}
