import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth.service';

@Injectable()
export class CustomerLocalStrategy extends PassportStrategy(
  Strategy,
  'customer-local',
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'phoneNumber' });
  }

  async validate(phoneNumber: string, password: string): Promise<any> {
    const user = await this.authService.validateCustomer(phoneNumber, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
