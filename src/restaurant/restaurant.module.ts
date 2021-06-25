import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem, MenuItemTopping } from '../menu/entities';
import { GeoModule } from './../geo/geo.module';
import { FavoriteRestaurant } from './entities';
import { Category } from './entities/category.entity';
import { OpenHour } from './entities/openhours.entity';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Restaurant,
      OpenHour,
      Category,
      MenuItem,
      MenuItemTopping,
      FavoriteRestaurant,
    ]),

    GeoModule,
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
