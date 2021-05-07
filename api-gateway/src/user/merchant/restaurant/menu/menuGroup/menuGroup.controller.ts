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
import { MerchantJwtAuthGuard } from './../../../../../auth/guards/jwts/merchant-jwt-auth.guard';
import { MerchantJwtRequest } from './../../../../../auth/strategies/jwt-strategies/merchant-jwt-request.interface';
import { DeleteMenuGroupNotFoundResponseDto, DeleteMenuGroupResponseDto, FetchMenuGroupQuery, UpdateMenuGroupDto, UpdateMenuGroupNotFoundResponseDto, UpdateMenuGroupResponseDto } from './dto';
import { CreateMenuGroupConflictResponseDto, CreateMenuGroupDto, CreateMenuGroupResponseDto, FetchMenuGroupByMenuResponseDto, FetchMenuGroupByMenuUnauthorizedResponseDto } from './dto';
import { MenuGroupService } from './menuGroup.service';

@ApiTags('merchant/restaurant/menu/menuGroup')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/merchant/:merchantId/restaurant/:restaurantId/menu/:menuId/menuGroup')
export class MenuGroupController {
  private logger = new Logger('MenuGroupController');

  constructor(
    private menuGroupService: MenuGroupService,
  ) { }

  @ApiOkResponse({ type: FetchMenuGroupByMenuResponseDto })
  @ApiUnauthorizedResponse({ type: FetchMenuGroupByMenuUnauthorizedResponseDto })
  @ApiQuery({ type: FetchMenuGroupQuery, required: false })
  @UseGuards(MerchantJwtAuthGuard)
  @Get()
  async fetchMenuGroup(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuId') menu,
    @Query() fetchMenuGroupByMenuQuery: FetchMenuGroupQuery,
  ): Promise<FetchMenuGroupByMenuResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.menuGroupService.fetchMenuGroup(merchantId, restaurant, menu, fetchMenuGroupByMenuQuery);
  }

  // Tao menu group
  @ApiCreatedResponse({ type: CreateMenuGroupResponseDto })
  @ApiConflictResponse({ type: CreateMenuGroupConflictResponseDto })
  @ApiBody({ type: CreateMenuGroupDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Post()
  async createMenuGroup(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuId') menu,
    @Body() createMenuGroupDto: CreateMenuGroupDto,
  ): Promise<CreateMenuGroupResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.menuGroupService.createMenuGroup(merchantId, restaurant, menu, createMenuGroupDto);
  }

  // Update menu group
  @ApiOkResponse({ type: UpdateMenuGroupResponseDto })
  @ApiNotFoundResponse({ type: UpdateMenuGroupNotFoundResponseDto })
  @ApiBody({ type: UpdateMenuGroupDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Patch(':menuGroupId')
  async updateMenuGroup(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuGroupId') menuGroup,
    @Param('menuId') menu,
    @Body() updateMenuGroupDto: UpdateMenuGroupDto,
  ): Promise<UpdateMenuGroupResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
      };
    }
    return await this.menuGroupService.updateMenuGroup(menuGroup, merchantId, restaurant, menu, updateMenuGroupDto);
  }

  // Delete menu group
  @ApiOkResponse({ type: DeleteMenuGroupResponseDto })
  @ApiNotFoundResponse({ type: DeleteMenuGroupNotFoundResponseDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Delete(':menuGroupId')
  async deleteMenuGroup(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuGroupId') menuGroup,
    @Param('menuId') menu,
  ): Promise<DeleteMenuGroupResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
      };
    }
    return await this.menuGroupService.deleteMenuGroup(menuGroup, merchantId, menu, restaurant);
  }
}