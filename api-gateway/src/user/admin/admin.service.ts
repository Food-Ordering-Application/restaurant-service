import { ISimpleResponse } from './../customer/interfaces/simple-response.interface';
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { USER_SERVICE } from "src/constants";
import { VerifyRestaurantDto } from "./dto/verify-restaurant/verify-restaurant.dto";

@Injectable()
export class AdminService {
  constructor(
    @Inject(USER_SERVICE) private userServiceClient: ClientProxy,
  ) { }

  async verifyRestaurant(verifyRestaurantDto: VerifyRestaurantDto) {
    const { restaurantId } = verifyRestaurantDto;
    const verifyRestaurant: ISimpleResponse = await this.userServiceClient
      .send('verifyRestaurant', { restaurantId })
      .toPromise();
    const { status, message, data } = verifyRestaurant;

    if (status !== HttpStatus.OK) {
      throw new HttpException({ message, }, status,);
    }

    return {
      statusCode: 200,
      message,
      data
    };
  }
}