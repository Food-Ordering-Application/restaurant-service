import { Category } from './entities/category.entity';
import { OpenHour } from './entities/openhours.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER_SERVICE } from 'src/constants';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { MenuItem, MenuItemTopping } from '../menu/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Restaurant,
      OpenHour,
      Category,
      MenuItem,
      MenuItemTopping,
    ]),
    ClientsModule.registerAsync([
      {
        name: USER_SERVICE,
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
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
