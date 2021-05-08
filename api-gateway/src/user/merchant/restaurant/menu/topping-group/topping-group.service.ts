import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as constants from '../../../../../constants';
import { ISimpleResponse } from '../../../../../shared/interfaces/simple-response.interface';
import {
  CreateToppingGroupDto,
  CreateToppingGroupResponseDto,
  DeleteToppingGroupResponseDto,
  FetchToppingGroupByMenuResponseDto,
  FetchToppingGroupQuery,
  UpdateToppingGroupDto,
  UpdateToppingGroupResponseDto
} from './dto';
import { IRestaurantServiceCreateToppingGroupResponse, IRestaurantServiceFetchToppingGroupByMenuResponse } from './interfaces';

@Injectable()
export class ToppingGroupService {
  constructor(
    @Inject(constants.RESTAURANT_SERVICE) private toppingGroupServiceClient: ClientProxy,
  ) { }

  async createToppingGroup(merchantId: string, restaurantId: string, menuId: string, createToppingGroupDto: CreateToppingGroupDto): Promise<CreateToppingGroupResponseDto> {
    const createToppingGroupResponse: IRestaurantServiceCreateToppingGroupResponse = await this.toppingGroupServiceClient
      .send('createToppingGroup', { merchantId, restaurantId, menuId, data: createToppingGroupDto })
      .toPromise();

    const { status, message, data } = createToppingGroupResponse;
    if (status !== HttpStatus.CREATED) {
      throw new HttpException({ message, }, status,);
    }
    const { toppingGroup } = data;
    return {
      statusCode: 201,
      message,
      data: {
        toppingGroup
      }
    };
  }

  async updateToppingGroup(toppingGroupId: string, merchantId: string, restaurantId: string, menuId: string, updateToppingGroupDto: UpdateToppingGroupDto): Promise<UpdateToppingGroupResponseDto> {
    const updateToppingGroupResponse: ISimpleResponse = await this.toppingGroupServiceClient
      .send('updateToppingGroup', { toppingGroupId, merchantId, restaurantId, menuId, data: updateToppingGroupDto })
      .toPromise();

    const { status, message } = updateToppingGroupResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message, }, status,);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  async deleteToppingGroup(toppingGroupId: string, merchantId: string, restaurantId: string, menuId: string): Promise<DeleteToppingGroupResponseDto> {
    const deleteToppingGroupResponse: ISimpleResponse = await this.toppingGroupServiceClient
      .send('deleteToppingGroup', { toppingGroupId, merchantId, restaurantId, menuId })
      .toPromise();

    const { status, message } = deleteToppingGroupResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message, }, status,);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  async fetchToppingGroup(merchantId: string, restaurantId: string, menuId: string, fetchToppingGroupByMenuQuery: FetchToppingGroupQuery): Promise<FetchToppingGroupByMenuResponseDto> {
    const fetchToppingGroupResponse: IRestaurantServiceFetchToppingGroupByMenuResponse = await this.toppingGroupServiceClient
      .send('fetchToppingGroupOfTopping', {
        merchantId,
        restaurantId,
        menuId,
        page: parseInt(fetchToppingGroupByMenuQuery.page) || 0,
        size: parseInt(fetchToppingGroupByMenuQuery.size) || 10,
        search: fetchToppingGroupByMenuQuery.q
      })
      .toPromise();

    const { status, message, data } = fetchToppingGroupResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message, }, status,);
    }
    const { results, size, total } = data;
    return {
      statusCode: 200,
      message,
      data: {
        results,
        size,
        total
      }
    };
  }
}
