import {
  Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, Request, UseGuards
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from '../../../../../shared/dto/internal-server-error.dto';
import { MerchantJwtAuthGuard } from '../../../../../auth/guards/jwts/merchant-jwt-auth.guard';
import { MerchantJwtRequest } from '../../../../../auth/strategies/jwt-strategies/merchant-jwt-request.interface';
import { DeleteToppingGroupNotFoundResponseDto, DeleteToppingGroupResponseDto, FetchToppingGroupQuery, UpdateToppingGroupDto, UpdateToppingGroupNotFoundResponseDto, UpdateToppingGroupResponseDto } from './dto';
import { CreateToppingGroupConflictResponseDto, CreateToppingGroupDto, CreateToppingGroupResponseDto, FetchToppingGroupByMenuResponseDto, FetchToppingGroupByMenuUnauthorizedResponseDto } from './dto';
import { ToppingGroupService } from './topping-group.service';

@ApiTags('merchant/restaurant/menu/topping-group')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/merchant/:merchantId/restaurant/:restaurantId/menu/:menuId/topping-group')
export class ToppingGroupController {
  private logger = new Logger('ToppingGroupController');

  constructor(
    private toppingGroupService: ToppingGroupService,
  ) { }

  @ApiOkResponse({ type: FetchToppingGroupByMenuResponseDto })
  @ApiUnauthorizedResponse({ type: FetchToppingGroupByMenuUnauthorizedResponseDto })
  @ApiQuery({ type: FetchToppingGroupQuery, required: false })
  @UseGuards(MerchantJwtAuthGuard)
  @Get()
  async fetchToppingGroup(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuId') menu,
    @Query() fetchToppingGroupByMenuQuery: FetchToppingGroupQuery,
  ): Promise<FetchToppingGroupByMenuResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.toppingGroupService.fetchToppingGroup(merchantId, restaurant, menu, fetchToppingGroupByMenuQuery);
  }

  // Tao menu group
  @ApiCreatedResponse({ type: CreateToppingGroupResponseDto })
  @ApiConflictResponse({ type: CreateToppingGroupConflictResponseDto })
  @ApiBody({ type: CreateToppingGroupDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Post()
  async createToppingGroup(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuId') menu,
    @Body() createToppingGroupDto: CreateToppingGroupDto,
  ): Promise<CreateToppingGroupResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.toppingGroupService.createToppingGroup(merchantId, restaurant, menu, createToppingGroupDto);
  }

  // Update menu group
  @ApiOkResponse({ type: UpdateToppingGroupResponseDto })
  @ApiNotFoundResponse({ type: UpdateToppingGroupNotFoundResponseDto })
  @ApiBody({ type: UpdateToppingGroupDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Patch(':toppingGroupId')
  async updateToppingGroup(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('toppingGroupId') toppingGroup,
    @Param('menuId') menu,
    @Body() updateToppingGroupDto: UpdateToppingGroupDto,
  ): Promise<UpdateToppingGroupResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
      };
    }
    return await this.toppingGroupService.updateToppingGroup(toppingGroup, merchantId, restaurant, menu, updateToppingGroupDto);
  }

  // Delete menu group
  @ApiOkResponse({ type: DeleteToppingGroupResponseDto })
  @ApiNotFoundResponse({ type: DeleteToppingGroupNotFoundResponseDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Delete(':toppingGroupId')
  async deleteToppingGroup(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('toppingGroupId') toppingGroup,
    @Param('menuId') menu,
  ): Promise<DeleteToppingGroupResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
      };
    }
    return await this.toppingGroupService.deleteToppingGroup(toppingGroup, merchantId, restaurant, menu);
  }
}