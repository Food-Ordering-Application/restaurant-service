import { ISimpleResponse } from './../customer/interfaces/simple-response.interface';
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { USER_SERVICE } from "src/constants";
import { VerifyRestaurantDto } from "./dto/verify-restaurant/verify-restaurant.dto";
import { IAdmin, IUserServiceResponse } from './interfaces';

@Injectable()
export class AdminService {
  constructor(
    @Inject(USER_SERVICE) private userServiceClient: ClientProxy,
  ) { }

  async getAuthenticatedAdmin(username: string, password: string): Promise<IAdmin> {
    const authenticatedAdminResponse: IUserServiceResponse = await this.userServiceClient
      .send('getAuthenticatedAdmin', { username, password })
      .toPromise();
    const { message, user, status } = authenticatedAdminResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message
        },
        status,
      );
    }
    return user;
  }

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