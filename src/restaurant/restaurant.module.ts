import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem, MenuItemTopping } from '../menu/entities';
import { GeoModule } from './../geo/geo.module';
import { FavoriteRestaurant } from './entities';
import { Category } from './entities/category.entity';
import { OpenHour } from './entities/openhours.entity';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { RestaurantElasticsearchService } from './search/restaurant-elasticsearch.service';

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
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          ...(!!configService.get('ELASTICSEARCH_CLOUD_ID')
            ? {
                cloud: {
                  id: configService.get('ELASTICSEARCH_CLOUD_ID'),
                },
              }
            : { node: configService.get('ELASTICSEARCH_NODE') }),
          auth: {
            username: configService.get('ELASTICSEARCH_USERNAME'),
            password: configService.get('ELASTICSEARCH_PASSWORD'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantElasticsearchService],
  exports: [RestaurantService, RestaurantElasticsearchService],
})
export class RestaurantModule {}
