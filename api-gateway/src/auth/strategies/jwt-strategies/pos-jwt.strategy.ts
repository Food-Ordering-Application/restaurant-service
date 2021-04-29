import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PosJwtPayload } from './pos-jwt-payload.interface';

@Injectable()
export class PosJwtStrategy extends PassportStrategy(
  Strategy,
  'pos-jwt',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: PosJwtPayload) {
    const { restaurantId, staffId, staffUsername } = payload;
    return {
      restaurantId,
      staffId,
      staffUsername
    };
  }
}
