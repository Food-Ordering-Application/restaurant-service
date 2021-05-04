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
import { InternalServerErrorResponseDto } from '../../../../shared/dto/internal-server-error.dto';
import { MerchantJwtAuthGuard } from './../../../../auth/guards/jwts/merchant-jwt-auth.guard';
import { MerchantJwtRequest } from './../../../../auth/strategies/jwt-strategies/merchant-jwt-request.interface';
import { DeleteStaffNotFoundResponseDto, DeleteStaffResponseDto, UpdateStaffDto, UpdateStaffNotFoundResponseDto, UpdateStaffResponseDto } from './dto';
import { CreateStaffConflictResponseDto, CreateStaffDto, CreateStaffResponseDto, FetchStaffByMerchantResponseDto, FetchStaffByMerchantUnauthorizedResponseDto, FetchStaffDto } from './dto/';
import { StaffService } from './staff.service';

@ApiTags('merchant/restaurant/staff')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/merchant/:merchantId/restaurant/:restaurantId/staff')
export class StaffController {
  private logger = new Logger('StaffController');

  constructor(
    private staffService: StaffService,
  ) { }

  @ApiOkResponse({ type: FetchStaffByMerchantResponseDto })
  @ApiUnauthorizedResponse({ type: FetchStaffByMerchantUnauthorizedResponseDto })
  @ApiQuery({ type: FetchStaffDto, required: false })
  @UseGuards(MerchantJwtAuthGuard)
  @Get()
  async fetchStaff(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Query() fetchStaffByMerchantDto: FetchStaffDto,
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
    return await this.staffService.fetchStaff(merchantId, restaurant, fetchStaffByMerchantDto);
  }

  // Tao nhan vien
  @ApiCreatedResponse({ type: CreateStaffResponseDto })
  @ApiConflictResponse({ type: CreateStaffConflictResponseDto })
  @ApiBody({ type: CreateStaffDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Post()
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
    return await this.staffService.createStaff(merchantId, restaurant, createStaffDto);
  }

  // Update nhan vien
  @ApiOkResponse({ type: UpdateStaffResponseDto })
  @ApiNotFoundResponse({ type: UpdateStaffNotFoundResponseDto })
  @ApiBody({ type: UpdateStaffDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Patch(':staffId')
  async updateStaff(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('staffId') staff,
    @Body() updateStaffDto: UpdateStaffDto,
  ): Promise<UpdateStaffResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
      };
    }
    return await this.staffService.updateStaff(staff, merchantId, restaurant, updateStaffDto);
  }

  // Delete nhan vien
  @ApiOkResponse({ type: DeleteStaffResponseDto })
  @ApiNotFoundResponse({ type: DeleteStaffNotFoundResponseDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Delete(':staffId')
  async deleteStaff(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('staffId') staff,
  ): Promise<DeleteStaffResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
      };
    }
    return await this.staffService.deleteStaff(staff, merchantId, restaurant);
  }
}
