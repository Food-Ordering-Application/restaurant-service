import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import * as constants from './constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: constants.USER_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'cats_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    CustomerModule,
    AuthModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
      }),
      envFilePath: 'src/.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
