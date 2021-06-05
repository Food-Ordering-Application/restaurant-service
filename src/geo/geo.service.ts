import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GeoService {
  // constructor(
  //   @InjectRepository(Restaurant)
  //   private restaurantRepository: Repository<Restaurant>,
  // ) {}
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
