import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as constants from '../constants';
import { AuthModule } from 'src/auth/auth.module';

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
    forwardRef(() => AuthModule),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
