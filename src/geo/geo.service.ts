import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area, City } from './entities';

@Injectable()
export class GeoService {
  constructor(
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async validCityAndArea(cityId: number, areaId: number): Promise<boolean> {
    const count = await this.areaRepository.count({
      id: areaId,
      cityId: cityId,
    });
    return count !== 0;
  }
  // async getRestaurantAddressInfo(
  //   getRestaurantAddressInfoDto: GetRestaurantAddressInfoDto,
  // ): Promise<IGetRestaurantAddressResponse> {
  //   const { restaurantId } = getRestaurantAddressInfoDto;
  //   try {
  //     //TODO: Lấy thông tin địa chỉ restaurant
  //     const restaurant = await this.restaurantRepository.findOne({
  //       id: restaurantId,
  //     });
  //     return {
  //       status: HttpStatus.OK,
  //       message: 'Restaurant address fetched successfully',
  //       data: {
  //         address: restaurant.address,
  //         geom: restaurant.geom,
  //       },
  //     };
  //   } catch (error) {
  //     this.logger.error(error);
  //     return {
  //       status: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: error.message,
  //       data: null,
  //     };
  //   }
  // }
}
