import { Body, Controller, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompanySignupDto } from './dtos/company-signup.dto';
import { CompanyLoginDto } from './dtos/company-login.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post('signup')
  signup(@Body() dto: CompanySignupDto) {
    return this.companiesService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: CompanyLoginDto) {
    return this.companiesService.login(dto);
  }
}
