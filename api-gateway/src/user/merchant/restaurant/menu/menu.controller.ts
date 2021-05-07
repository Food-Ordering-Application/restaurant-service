import { Controller, Get, Logger, Param, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { MerchantJwtRequest } from 'src/auth/strategies/jwt-strategies/merchant-jwt-request.interface';
import { InternalServerErrorResponseDto } from '../../../../shared/dto/internal-server-error.dto';
import { MerchantJwtAuthGuard } from '../../../../auth/guards/jwts/merchant-jwt-auth.guard';
import { MerchantJwtPayload } from '../../../../auth/strategies/jwt-strategies/merchant-jwt-payload.interface';
import { CreateMenuResponseDto, FetchMenuDto } from './dto';
import { CreateMenuDto } from './dto/create-menu/create-menu.dto';
import { FetchMenuOfRestaurantResponseDto } from './dto/fetch-menu/fetch-menu-response.dto';
import { FetchMenuOfRestaurantUnauthorizedResponseDto } from './dto/fetch-menu/fetch-menu-unauthorized-response.dto';
import { MenuService } from './menu.service';

@ApiTags('merchant/restaurant/menu')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/merchant/:merchantId/restaurant/:restaurantId/menu')
export class MenuController {
  private logger = new Logger('MenuController');

  constructor(
    private menuService: MenuService,
  ) { }

  @ApiOkResponse({ type: FetchMenuOfRestaurantResponseDto })
  @ApiUnauthorizedResponse({ type: FetchMenuOfRestaurantUnauthorizedResponseDto })
  @ApiQuery({ type: FetchMenuDto, required: false })
  @UseGuards(MerchantJwtAuthGuard)
  @Get()
  async fetchMenuOfRestaurant(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Query() fetchMenuOfRestaurantDto: FetchMenuDto,
  ): Promise<FetchMenuOfRestaurantResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant || restaurant !== fetchMenuOfRestaurantDto.restaurantId) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.menuService.fetchMenuOfRestaurant(merchantId, fetchMenuOfRestaurantDto);
  }

  @ApiCreatedResponse({ type: CreateMenuResponseDto })
  @ApiBody({ type: CreateMenuDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Post()
  async createMenu(
    @Req() req,
    @Payload() createMenuDto: CreateMenuDto,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
  ) {
    const merchantPayload: MerchantJwtPayload = req.user;
    const { merchantId } = merchantPayload;
    if (merchantId !== merchant || restaurant != createMenuDto.restaurantId) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.menuService.createMenu(merchantId, createMenuDto);
  }
}
