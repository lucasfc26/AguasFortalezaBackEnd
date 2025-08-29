import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WholesaleCompany } from './entities/wholesale-company.entity';
import { CompanySignupDto } from './dtos/company-signup.dto';
import { CompanyLoginDto } from './dtos/company-login.dto';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(WholesaleCompany)
    private readonly companyRepo: Repository<WholesaleCompany>,
  ) {}

  async signup(dto: CompanySignupDto) {
    const passwordHash = await bcrypt.hash(dto.passwordCompany, 10);
    const company = this.companyRepo.create({
      uuidCompany: randomUUID(),
      userCompany: dto.userCompany,
      passwordCompany: passwordHash,
      validationTokenCompany: dto.validationTokenCompany ?? null,
      nameCompany: dto.nameCompany,
      emailCompany: dto.emailCompany,
      cnpjCompany: dto.cnpjCompany,
      addressCompany: dto.addressCompany,
      contSellsCompany: 0,
      rateCompany: 0,
      delivery: dto.delivery ?? false,
      timeOpenCompany: dto.timeOpenCompany
        ? new Date(dto.timeOpenCompany)
        : null,
      timeCloseCompany: dto.timeCloseCompany
        ? new Date(dto.timeCloseCompany)
        : null,
      phoneCompany: dto.phoneCompany ?? null,
    });
    await this.companyRepo.save(company);
    return {
      uuidCompany: company.uuidCompany,
      userCompany: company.userCompany,
    };
  }

  async login(dto: CompanyLoginDto) {
    const company = await this.companyRepo.findOne({
      where: { userCompany: dto.userCompany },
    });
    if (!company) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(
      dto.passwordCompany,
      company.passwordCompany,
    );
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return {
      uuidCompany: company.uuidCompany,
      userCompany: company.userCompany,
    };
  }

  async listCompanies() {
    const companies = await this.companyRepo.find();
    return companies.map((company) => company.nameCompany);
  }
}
