import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as constants from '../../../../../constants';
import { ISimpleResponse } from '../../../../../shared/interfaces/simple-response.interface';
import {
  CreateMenuGroupDto,
  CreateMenuGroupResponseDto,
  DeleteMenuGroupResponseDto,
  FetchMenuGroupByMenuResponseDto,
  FetchMenuGroupQuery,
  UpdateMenuGroupDto,
  UpdateMenuGroupResponseDto
} from './dto';
import { IUserServiceCreateMenuGroupResponse, IUserServiceFetchMenuGroupByMenuResponse } from './interfaces';

@Injectable()
export class MenuGroupService {
  constructor(
    @Inject(constants.RESTAURANT_SERVICE) private menuGroupServiceClient: ClientProxy,
  ) { }

  async createMenuGroup(merchantId: string, restaurantId: string, menuId: string, createMenuGroupDto: CreateMenuGroupDto): Promise<CreateMenuGroupResponseDto> {
    const createMenuGroupResponse: IUserServiceCreateMenuGroupResponse = await this.menuGroupServiceClient
      .send('createMenuGroup', { merchantId, restaurantId, menuId, data: createMenuGroupDto })
      .toPromise();

    const { status, message, data } = createMenuGroupResponse;
    if (status !== HttpStatus.CREATED) {
      throw new HttpException({ message, }, status,);
    }
    const { menuGroup } = data;
    return {
      statusCode: 201,
      message,
      data: {
        menuGroup
      }
    };
  }

  async updateMenuGroup(menuGroupId: string, merchantId: string, restaurantId: string, menuId: string, updateMenuGroupDto: UpdateMenuGroupDto): Promise<UpdateMenuGroupResponseDto> {
    const updateMenuGroupResponse: ISimpleResponse = await this.menuGroupServiceClient
      .send('updateMenuGroup', { menuGroupId, merchantId, restaurantId, menuId, data: updateMenuGroupDto })
      .toPromise();

    const { status, message } = updateMenuGroupResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message, }, status,);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  async deleteMenuGroup(menuGroupId: string, merchantId: string, restaurantId: string, menuId: string): Promise<DeleteMenuGroupResponseDto> {
    const deleteMenuGroupResponse: ISimpleResponse = await this.menuGroupServiceClient
      .send('deleteMenuGroupOfMenu', { menuGroupId, merchantId, restaurantId, menuId })
      .toPromise();

    const { status, message } = deleteMenuGroupResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message, }, status,);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  async fetchMenuGroup(merchantId: string, restaurantId: string, menuId: string, fetchMenuGroupByMenuQuery: FetchMenuGroupQuery): Promise<FetchMenuGroupByMenuResponseDto> {
    const fetchMenuGroupResponse: IUserServiceFetchMenuGroupByMenuResponse = await this.menuGroupServiceClient
      .send('fetchMenuGroupOfMenu', {
        merchantId,
        restaurantId,
        menuId,
        page: parseInt(fetchMenuGroupByMenuQuery.page) || 0,
        size: parseInt(fetchMenuGroupByMenuQuery.size) || 10,
        search: fetchMenuGroupByMenuQuery.q
      })
      .toPromise();

    const { status, message, data } = fetchMenuGroupResponse;
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
