import { IStaffLogin } from '../../../user/pos/interfaces/index';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../auth.service';
import { LoginPosDto } from './../../../user/pos/dto/login-pos/login-pos.dto';

@Injectable()
export class PosLocalStrategy extends PassportStrategy(
  Strategy,
  'pos-local',
) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passReqToCallback: true
    });
  }

  async validate(req: { body: LoginPosDto }): Promise<IStaffLogin> {
    const { body } = req;
    const { username, password, restaurantId } = body;
    const user = await this.authService.validatePos(username, password, restaurantId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
