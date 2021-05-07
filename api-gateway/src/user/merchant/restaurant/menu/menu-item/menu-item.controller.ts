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
import { DeleteMenuItemNotFoundResponseDto, DeleteMenuItemResponseDto, FetchMenuItemQuery, UpdateMenuItemDto, UpdateMenuItemNotFoundResponseDto, UpdateMenuItemResponseDto } from './dto';
import { CreateMenuItemConflictResponseDto, CreateMenuItemDto, CreateMenuItemResponseDto, FetchMenuItemByMenuResponseDto, FetchMenuItemByMenuUnauthorizedResponseDto } from './dto';
import { MenuItemService } from './menu-item.service';

@ApiTags('merchant/restaurant/menu/menu-item')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/merchant/:merchantId/restaurant/:restaurantId/menu/:menuId/menu-item')
export class MenuItemController {
  private logger = new Logger('MenuItemController');

  constructor(
    private menuItemService: MenuItemService,
  ) { }

  @ApiOkResponse({ type: FetchMenuItemByMenuResponseDto })
  @ApiUnauthorizedResponse({ type: FetchMenuItemByMenuUnauthorizedResponseDto })
  @ApiQuery({ type: FetchMenuItemQuery, required: false })
  @UseGuards(MerchantJwtAuthGuard)
  @Get()
  async fetchMenuItem(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuId') menu,
    @Query() fetchMenuItemByMenuQuery: FetchMenuItemQuery,
  ): Promise<FetchMenuItemByMenuResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.menuItemService.fetchMenuItem(merchantId, restaurant, menu, fetchMenuItemByMenuQuery);
  }

  // Tao menu item
  @ApiCreatedResponse({ type: CreateMenuItemResponseDto })
  @ApiConflictResponse({ type: CreateMenuItemConflictResponseDto })
  @ApiBody({ type: CreateMenuItemDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Post()
  async createMenuItem(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuId') menu,
    @Body() createMenuItemDto: CreateMenuItemDto,
  ): Promise<CreateMenuItemResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.menuItemService.createMenuItem(merchantId, restaurant, menu, createMenuItemDto);
  }

  // Update menu item
  @ApiOkResponse({ type: UpdateMenuItemResponseDto })
  @ApiNotFoundResponse({ type: UpdateMenuItemNotFoundResponseDto })
  @ApiBody({ type: UpdateMenuItemDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Patch(':menuItemId')
  async updateMenuItem(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuItemId') menuItem,
    @Param('menuId') menu,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<UpdateMenuItemResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
      };
    }
    return await this.menuItemService.updateMenuItem(menuItem, merchantId, restaurant, menu, updateMenuItemDto);
  }

  // Delete menu item
  @ApiOkResponse({ type: DeleteMenuItemResponseDto })
  @ApiNotFoundResponse({ type: DeleteMenuItemNotFoundResponseDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Delete(':menuItemId')
  async deleteMenuItem(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuItemId') menuItem,
    @Param('menuId') menu,
  ): Promise<DeleteMenuItemResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
      };
    }
    return await this.menuItemService.deleteMenuItem(menuItem, merchantId, restaurant, menu);
  }
}