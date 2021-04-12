import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as constants from '../constants';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: constants.USER_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('AMQP_URL') as string],
            queue: configService.get('USERS_AMQP_QUEUE'),
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}

// [
//   {
//     name: constants.USER_SERVICE,
//     transport: Transport.RMQ,
// options: {
//   urls: ['amqp://admin:admin@rabbitmq:5672'],
//   queue: 'cats_queue',
//   queueOptions: {
//     durable: false,
//   },
// },
//   },
// ]
