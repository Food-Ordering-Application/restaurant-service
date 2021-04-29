import { IMerchant } from './../../../user/merchant/interfaces/merchant.interface';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth.service';

@Injectable()
export class MerchantLocalStrategy extends PassportStrategy(
  Strategy,
  'merchant-local',
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string): Promise<IMerchant> {
    const user = await this.authService.validateMerchant(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
