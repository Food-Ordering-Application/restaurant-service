import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  private logger = new Logger('OrderController');

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    this.logger.log('Adding ' + data.toString());
    return this.orderService.accumulate(data);
  }
}
