import {
  Body, Controller, Get, HttpCode, Logger, Param, Post, Request, UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { MerchantJwtRequest } from 'src/auth/strategies/jwt-strategies/merchant-jwt-request.interface';
import { InternalServerErrorResponseDto } from '../../shared/dto/internal-server-error.dto';
import {
  CreateMerchantConflictResponseDto,
  CreateMerchantDto, CreateMerchantResponseDto, FindMerchantByIdResponseDto, FindMerchantByIdUnauthorizedResponseDto, LoginMerchantDto, LoginMerchantResponseDto, LoginMerchantUnauthorizedResponseDto
} from '../merchant/dto/index';
import { MerchantJwtAuthGuard } from './../../auth/guards/jwts/merchant-jwt-auth.guard';
import { MerchantLocalAuthGuard } from './../../auth/guards/locals/merchant-local-auth.guard';
import { MerchantService } from './merchant.service';

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
}
