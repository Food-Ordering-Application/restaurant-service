import { forwardRef, Module } from '@nestjs/common';
import { CustomerModule } from 'src/user/customer.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { CustomerLocalStrategy } from './strategies/local-strategies/customer-local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_SECRET } from '../constants';
import { CustomerJwtStrategy } from './strategies/jwt-strategies/customer-jwt.strategy';

@Module({
  imports: [
    forwardRef(() => CustomerModule),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(JWT_SECRET),
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  providers: [AuthService, CustomerLocalStrategy, CustomerJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
