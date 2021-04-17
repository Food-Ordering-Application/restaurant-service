import { Injectable, Logger } from '@nestjs/common';
import { CustomerService } from '../user/customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async validateCustomer(phoneNumber: string, pass: string): Promise<any> {
    const user = await this.customerService.findCustomerByPhoneNumber(
      phoneNumber,
    );

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      phoneNumber: user.phoneNumber,
      sub: user.id,
      isCustomer: true,
    };
    return {
      statusCode: 200,
      message: 'Customer login successfully',
      data: {
        user: user,
        access_token: this.jwtService.sign(payload),
      },
    };
  }
}
