import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'wholesale_company' })
export class WholesaleCompany {
  @PrimaryColumn({ name: 'uuid_company', type: 'uuid' })
  uuidCompany: string;

  @Column({ name: 'user_company', unique: true })
  userCompany: string;

  @Column({ name: 'password_company' })
  passwordCompany: string;

  @Column({ name: 'validation_token_company', nullable: true })
  validationTokenCompany: string | null;

  @Column({ name: 'name_company' })
  nameCompany: string;

  @Column({ name: 'email_company', unique: true })
  emailCompany: string;

  @Column({ name: 'cnpj_company', unique: true })
  cnpjCompany: string;

  @Column({ name: 'address_company', nullable: true })
  addressCompany: string | null;

  @Column({ name: 'cont_sells_company', type: 'int', default: 0 })
  contSellsCompany: number;

  @Column({ name: 'rate_company', type: 'float', default: 0 })
  rateCompany: number;

  @Column({ name: 'delivery', type: 'boolean', default: false })
  delivery: boolean;

  @Column({ name: 'time_open_company', type: 'timestamp', nullable: true })
  timeOpenCompany: Date | null;

  @Column({ name: 'time_close_company', type: 'timestamp', nullable: true })
  timeCloseCompany: Date | null;

  @Column({ name: 'phone_company', nullable: true })
  phoneCompany: string | null;
}
