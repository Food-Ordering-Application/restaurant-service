import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto';
import { ICreateOrderResponse } from './interfacets';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('createOrderAndFirstOrderItem')
  async createOrderAndFirstOrderItem(
    @Payload() createOrderDto: CreateOrderDto,
  ): Promise<ICreateOrderResponse> {
    return this.orderService.createOrderAndFirstOrderItem(createOrderDto);
  }
}
