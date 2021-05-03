import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from 'src/constants';
import { VerifyAppKeyDto, VerifyAppKeyResponseDto } from './dto';
import { IStaffLogin, IUserServiceLoginPosResponse, IUserServiceVerifyAppKeyResponse } from './interfaces';

@Injectable()
export class PosService {
  constructor(
    @Inject(USER_SERVICE) private userServiceClient: ClientProxy,
  ) { }


  async verifyAppKey(verifyAppKeyDto: VerifyAppKeyDto): Promise<VerifyAppKeyResponseDto> {
    const { posAppKey, deviceId } = verifyAppKeyDto;
    const verifyRestaurant: IUserServiceVerifyAppKeyResponse = await this.userServiceClient
      .send('verifyPosAppKey', { posAppKey, deviceId })
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

  async getAuthenticatedStaff(username: string, password: string, restaurantId: string): Promise<IStaffLogin> {
    const authenticatedStaffResponse: IUserServiceLoginPosResponse = await this.userServiceClient
      .send('getAuthenticatedStaff', { username, password, restaurantId })
      .toPromise();
    const { message, user, status } = authenticatedStaffResponse;
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
}
