import { MerchantJwtAuthGuard } from './../../auth/guards/jwts/merchant-jwt-auth.guard';
import { MerchantLocalAuthGuard } from './../../auth/guards/locals/merchant-local-auth.guard';
import {
  Body, Controller, Get, HttpCode, Logger, Param, Post, Query, Request, UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { InternalServerErrorResponseDto } from '../../shared/dto/internal-server-error.dto';
import {
  CreateMerchantConflictResponseDto,
  CreateMerchantDto, CreateMerchantResponseDto, CreateStaffConflictResponseDto, CreateStaffDto, CreateStaffResponseDto, FetchStaffByMerchantDto, FetchStaffByMerchantResponseDto, FetchStaffByMerchantUnauthorizedResponseDto, FindMerchantByIdResponseDto, FindMerchantByIdUnauthorizedResponseDto, LoginMerchantDto, LoginMerchantResponseDto, LoginMerchantUnauthorizedResponseDto,
} from '../merchant/dto/index';
import { MerchantService } from './merchant.service';
import { MerchantJwtRequest } from 'src/auth/strategies/jwt-strategies/merchant-jwt-request.interface';

@ApiTags('merchant')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/merchant')
export class MerchantController {
  private logger = new Logger('MerchantController');

  constructor(
    private merchantService: MerchantService,
    private authService: AuthService,
  ) { }

  // Đăng ký Merchant
  @ApiCreatedResponse({ type: CreateMerchantResponseDto })
  @ApiConflictResponse({ type: CreateMerchantConflictResponseDto })
  @ApiBody({ type: CreateMerchantDto })
  @Post()
  async registerMerchant(
    @Body() createMerchantDto: CreateMerchantDto,
  ): Promise<CreateMerchantResponseDto> {
    return await this.merchantService.createMerchant(createMerchantDto);
  }

  // Đăng nhập Merchant
  @ApiOkResponse({ type: LoginMerchantResponseDto })
  @ApiUnauthorizedResponse({ type: LoginMerchantUnauthorizedResponseDto })
  @ApiBody({ type: LoginMerchantDto })
  @UseGuards(MerchantLocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async loginMerchant(@Request() req): Promise<LoginMerchantResponseDto> {
    return await this.authService.merchantLogin(req.user);
  }

  // Fetch merchant data
  @ApiOkResponse({ type: FindMerchantByIdResponseDto })
  @ApiUnauthorizedResponse({ type: FindMerchantByIdUnauthorizedResponseDto })
  @ApiBearerAuth()
  @ApiParam({
    name: 'merchantId',
    type: 'String',
    required: true,
  })
  @UseGuards(MerchantJwtAuthGuard)
  @Get('/:merchantId')
  async findMerchantById(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchantId,
  ): Promise<FindMerchantByIdResponseDto> {
    // Nếu không phải chính user đó
    if (req.user.merchantId !== merchantId) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.merchantService.findMerchantById(merchantId);
  }

  // Tao nhan vien
  @ApiCreatedResponse({ type: CreateStaffResponseDto })
  @ApiConflictResponse({ type: CreateStaffConflictResponseDto })
  @ApiBody({ type: CreateStaffDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Post('/:merchantId/restaurant/:restaurantId/staff')
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
    return await this.merchantService.createStaff(merchantId, restaurant, createStaffDto);
  }

  @ApiOkResponse({ type: FetchStaffByMerchantResponseDto })
  @ApiUnauthorizedResponse({ type: FetchStaffByMerchantUnauthorizedResponseDto })
  @ApiQuery({ type: FetchStaffByMerchantDto, required: false })
  @UseGuards(MerchantJwtAuthGuard)
  @Get('/:merchantId/restaurant/:restaurantId/staff')
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
    return await this.merchantService.fetchStaff(merchantId, restaurant, fetchStaffByMerchantDto);
  }

}
