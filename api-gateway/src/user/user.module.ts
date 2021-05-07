import { MenuService } from './merchant/restaurant/menu/menu.service';
import { MenuGroupService } from './merchant/restaurant/menu/menuGroup/menuGroup.service';
import { MenuGroupController } from './merchant/restaurant/menu/menuGroup/menuGroup.controller';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { CaslModule } from 'src/casl/casl.module';
import * as constants from '../constants';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { MerchantController } from './merchant/merchant.controller';
import { MerchantService } from './merchant/merchant.service';
import { RestaurantController } from './merchant/restaurant/restaurant.controller';
import { RestaurantService } from './merchant/restaurant/restaurant.service';
import { StaffController } from './merchant/restaurant/staff/staff.controller';
import { StaffService } from './merchant/restaurant/staff/staff.service';
import { PosController } from './pos/pos.controller';
import { PosService } from './pos/pos.service';
import { MenuController } from './merchant/restaurant/menu/menu.controller';

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
      {
        name: constants.RESTAURANT_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('AMQP_URL') as string],
            queue: configService.get('RESTAURANT_AMQP_QUEUE'),
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    forwardRef(() => AuthModule),
    CaslModule,
  ],
  controllers: [
    CustomerController,
    MerchantController,
    AdminController,
    PosController,
    RestaurantController,
    StaffController,
    MenuController,
    MenuGroupController
  ],
  providers: [
    CustomerService,
    MerchantService,
    AdminService,
    PosService,
    RestaurantService,
    StaffService,
    MenuService,
    MenuGroupService
  ],
  exports: [
    CustomerService,
    MerchantService,
    AdminService,
    PosService,
    RestaurantService,
    StaffService,
    MenuService,
    MenuGroupService
  ],
})
export class UserModule { }
