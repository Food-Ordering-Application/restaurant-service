import { Controller, Get, Logger, Param, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiBody,


  ApiInternalServerErrorResponse,

  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { MerchantJwtRequest } from 'src/auth/strategies/jwt-strategies/merchant-jwt-request.interface';
import { InternalServerErrorResponseDto } from '../../../shared/dto/internal-server-error.dto';
import { MerchantJwtAuthGuard } from './../../../auth/guards/jwts/merchant-jwt-auth.guard';
import { MerchantJwtPayload } from './../../../auth/strategies/jwt-strategies/merchant-jwt-payload.interface';
import { FetchRestaurantDto } from './dto';
import { CreateRestaurantDto } from './dto/create-restaurant/create-restaurant.dto';
import { FetchRestaurantsOfMerchantResponseDto } from './dto/fetch-restaurant/fetch-restaurant-response.dto';
import { FetchRestaurantsOfMerchantUnauthorizedResponseDto } from './dto/fetch-restaurant/fetch-restaurant-unauthorized-response.dto';
import { RestaurantService } from './restaurant.service';

@ApiTags('merchant/restaurant')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/merchant/:merchantId/restaurant')
export class RestaurantController {
  private logger = new Logger('RestaurantController');

  constructor(
    private restaurantService: RestaurantService,
  ) { }

  @ApiOkResponse({ type: FetchRestaurantsOfMerchantResponseDto })
  @ApiUnauthorizedResponse({ type: FetchRestaurantsOfMerchantUnauthorizedResponseDto })
  @ApiQuery({ type: FetchRestaurantDto, required: false })
  @UseGuards(MerchantJwtAuthGuard)
  @Get()
  async fetchRestaurantsOfMerchant(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Query() fetchRestaurantByMerchantDto: FetchRestaurantDto,
  ): Promise<FetchRestaurantsOfMerchantResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.restaurantService.fetchRestaurantsOfMerchant(merchantId, fetchRestaurantByMerchantDto);
  }

  @ApiBody({ type: CreateRestaurantDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Post()
  async createRestaurant(
    @Req() req,
    @Payload() createRestaurantDto: CreateRestaurantDto,
    @Param('merchantId') merchant,
  ) {
    const merchantPayload: MerchantJwtPayload = req.user;
    const { merchantId } = merchantPayload;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.restaurantService.createRestaurant(merchantId, createRestaurantDto);
  }
}
