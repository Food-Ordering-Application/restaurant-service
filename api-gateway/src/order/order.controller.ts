import { Controller, Post, Body, Logger, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from '../shared/dto/internal-server-error.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwts/jwt-auth.guard';
import { CreateOrderResponseDto, CreateOrderDto } from './dto';

@ApiTags('orders')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('order')
export class OrderController {
  private logger = new Logger('OrderController');

  constructor(private readonly orderService: OrderService) {}

  // Tạo order và orderItem tương ứng
  @ApiCreatedResponse({ type: CreateOrderResponseDto })
  @ApiBody({ type: CreateOrderDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrderAndFirstOrderItem(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    return this.orderService.createOrderAndFirstOrderItem(createOrderDto);
  }
}
