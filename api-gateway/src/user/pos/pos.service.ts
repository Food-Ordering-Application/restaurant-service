import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from 'src/constants';
import { VerifyAppKeyDto, VerifyAppKeyResponseDto } from './dto';
import { IUserServiceVerifyAppKeyResponse } from './interfaces';

@Injectable()
export class PosService {
  constructor(
    @Inject(USER_SERVICE) private userServiceClient: ClientProxy,
  ) { }


  async verifyAppKey(verifyAppKeyDto: VerifyAppKeyDto): Promise<VerifyAppKeyResponseDto> {
    const { posAppKey } = verifyAppKeyDto;
    const verifyRestaurant: IUserServiceVerifyAppKeyResponse = await this.userServiceClient
      .send('verifyPosAppKey', { posAppKey })
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
