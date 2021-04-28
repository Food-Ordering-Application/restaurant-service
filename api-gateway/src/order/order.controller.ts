import {
  Controller,
  Post,
  Body,
  Logger,
  UseGuards,
  Get,
  HttpCode,
  Param,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from '../shared/dto/internal-server-error.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwts/jwt-auth.guard';
import {
  CreateOrderResponseDto,
  CreateOrderDto,
  GetOrderAssociatedWithCusAndResResponseDto,
  GetOrderAssociatedWithCusAndResDto,
  AddNewItemToOrderDto,
  AddNewItemToOrderResponseDto,
} from './dto';

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

  // Lấy order DRAFT của customer và restaurant
  @ApiOkResponse({ type: GetOrderAssociatedWithCusAndResResponseDto })
  @ApiBody({ type: GetOrderAssociatedWithCusAndResDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('/get-order-associated')
  async getOrderAssociatedWithCusAndRes(
    @Body()
    getOrderAssociatedWithCusAndResDto: GetOrderAssociatedWithCusAndResDto,
  ): Promise<GetOrderAssociatedWithCusAndResResponseDto> {
    return this.orderService.getOrderAssociatedWithCusAndRes(
      getOrderAssociatedWithCusAndResDto,
    );
  }

  // Thêm item vào trong order
  @ApiOkResponse({ type: AddNewItemToOrderResponseDto })
  @ApiBody({ type: AddNewItemToOrderDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('/:orderId/update-orderItem')
  async addNewItemToOrder(
    @Body()
    addNewItemToOrderDto: AddNewItemToOrderDto,
    @Param() params,
  ): Promise<AddNewItemToOrderResponseDto> {
    const { orderId } = params;
    return this.orderService.addNewItemToOrder(addNewItemToOrderDto, orderId);
  }

  // Giảm số lượng quantity của 1 orderItem trong order
  // @ApiOkResponse({ type: AddNewOrderItemToOrderResponseDto })
  // @ApiBody({ type: AddNewOrderItemToOrderDto })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @HttpCode(200)
  // @Post('/:orderId/update-orderItem')
  // async addNewOrderItemToOrder(
  //   @Body()
  //   addNewOrderItemToOrderDto: AddNewOrderItemToOrderDto,
  //   @Param() params,
  // ): Promise<AddNewOrderItemToOrderResponseDto> {
  //   const { orderId } = params;
  //   return this.orderService.addNewOrderItemToOrder(
  //     addNewOrderItemToOrderDto,
  //     orderId,
  //   );
  // }
}
