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

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateMerchant(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
