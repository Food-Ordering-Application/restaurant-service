import {
  Body, Controller, Get, Logger, Param, Post, Query, Req, Request, UseGuards
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { MerchantJwtRequest } from 'src/auth/strategies/jwt-strategies/merchant-jwt-request.interface';
import { InternalServerErrorResponseDto } from '../../../shared/dto/internal-server-error.dto';
import { CreateStaffConflictResponseDto, CreateStaffDto, CreateStaffResponseDto, FetchStaffByMerchantDto, FetchStaffByMerchantResponseDto, FetchStaffByMerchantUnauthorizedResponseDto } from '../../merchant/dto/';
import { MerchantJwtAuthGuard } from './../../../auth/guards/jwts/merchant-jwt-auth.guard';
import { MerchantJwtPayload } from './../../../auth/strategies/jwt-strategies/merchant-jwt-payload.interface';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@ApiTags('merchant/restaurant')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/merchant/:merchantId/restaurant')
export class RestaurantController {
  private logger = new Logger('RestaurantController');

  constructor(
    private restaurantService: RestaurantService,
  ) { }

  // Tao nhan vien
  @ApiCreatedResponse({ type: CreateStaffResponseDto })
  @ApiConflictResponse({ type: CreateStaffConflictResponseDto })
  @ApiBody({ type: CreateStaffDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Post(':restaurantId/staff')
  async createStaff(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Body() createStaffDto: CreateStaffDto,
  ): Promise<CreateStaffResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.restaurantService.createStaff(merchantId, restaurant, createStaffDto);
  }

  @ApiOkResponse({ type: FetchStaffByMerchantResponseDto })
  @ApiUnauthorizedResponse({ type: FetchStaffByMerchantUnauthorizedResponseDto })
  @ApiQuery({ type: FetchStaffByMerchantDto, required: false })
  @UseGuards(MerchantJwtAuthGuard)
  @Get(':restaurantId/staff')
  async fetchStaff(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Query() fetchStaffByMerchantDto: FetchStaffByMerchantDto,
  ): Promise<FetchStaffByMerchantResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.restaurantService.fetchStaff(merchantId, restaurant, fetchStaffByMerchantDto);
  }

  @ApiBody({ type: CreateRestaurantDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Post()
  createRestaurant(@Req() req, @Payload() createRestaurantDto: CreateRestaurantDto) {
    const merchantPayload: MerchantJwtPayload = req.user;
    const { merchantId } = merchantPayload;
    return this.restaurantService.createRestaurant(merchantId, createRestaurantDto);
  }
}
