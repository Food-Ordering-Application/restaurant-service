import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as constants from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateOrderResponseDto,
  CreateOrderDto,
  GetOrderAssociatedWithCusAndResResponseDto,
  GetOrderAssociatedWithCusAndResDto,
} from './dto';
import { ICreateOrderResponse } from './interfaces';

@Injectable()
export class OrderService {
  constructor(
    @Inject(constants.ORDER_SERVICE)
    private orderServiceClient: ClientProxy,
  ) {}

  async createOrderAndFirstOrderItem(
    createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    const createOrderAndFirstOrderItemResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('createOrderAndFirstOrderItem', createOrderDto)
      .toPromise();

    const { message, order, status } = createOrderAndFirstOrderItemResponse;

    if (status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async getOrderAssociatedWithCusAndRes(
    getOrderAssociatedWithCusAndResDto: GetOrderAssociatedWithCusAndResDto,
  ): Promise<GetOrderAssociatedWithCusAndResResponseDto> {
    const getOrderAssociatedWithCusAndResResponse: ICreateOrderResponse = await this.orderServiceClient
      .send(
        'getOrderAssociatedWithCusAndRes',
        getOrderAssociatedWithCusAndResDto,
      )
      .toPromise();

    const { message, order, status } = getOrderAssociatedWithCusAndResResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }
}
