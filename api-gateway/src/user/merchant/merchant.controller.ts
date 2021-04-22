import { MerchantLocalAuthGuard } from './../../auth/guards/locals/merchant-local-auth.guard';
import {
  Body, Controller, HttpCode, Logger, Post, Request, UseGuards
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { InternalServerErrorResponseDto } from '../../shared/dto/internal-server-error.dto';
import {
  CreateMerchantConflictResponseDto,
  CreateMerchantDto, CreateMerchantResponseDto, LoginMerchantDto, LoginMerchantResponseDto, LoginMerchantUnauthorizedResponseDto,
} from '../merchant/dto/index';
import { MerchantService } from './merchant.service';

@ApiTags('users')
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
    return this.merchantService.createMerchant(createMerchantDto);
  }

  // Đăng nhập Merchant
  @ApiOkResponse({ type: LoginMerchantResponseDto })
  @ApiUnauthorizedResponse({ type: LoginMerchantUnauthorizedResponseDto })
  @ApiBody({ type: LoginMerchantDto })
  @UseGuards(MerchantLocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async loginMerchant(@Request() req): Promise<LoginMerchantResponseDto> {
    return this.authService.merchantLogin(req.user);
  }

  // // Gửi mã OTP
  // @ApiOkResponse({ type: SendPhoneNumberOTPVerifyResponseDto })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @HttpCode(200)
  // @Post('/send-otp')
  // async sendOTPVerify(
  //   @Request() req,
  // ): Promise<SendPhoneNumberOTPVerifyResponseDto> {
  //   return this.merchantService.sendPhoneNumberOTPVerify(req.user);
  // }

  // // Verified OTP
  // @ApiOkResponse({ type: VerifyMerchantPhoneNumberResponseDto })
  // @ApiUnauthorizedResponse({
  //   type: VerifyMerchantPhoneNumberUnauthorizedResponseDto,
  // })
  // @ApiBody({ type: VerifyMerchantPhoneNumberDto })
  // @ApiBearerAuth()
  // @HttpCode(200)
  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Merchant))
  // @Post('/verify-otp')
  // async verifyMerchantPhoneNumber(
  //   @Request() req,
  //   @Body() verifyOtpDto: VerifyMerchantPhoneNumberDto,
  // ): Promise<VerifyMerchantPhoneNumberResponseDto> {
  //   this.logger.log(req.user);
  //   return this.merchantService.verifyMerchantPhoneNumber(
  //     req.user,
  //     verifyOtpDto.otp,
  //   );
  // }

  // // Fetch merchant data
  // @ApiOkResponse({ type: FindMerchantByIdResponseDto })
  // @ApiUnauthorizedResponse({ type: FindMerchantByIdUnauthorizedResponseDto })
  // @ApiBearerAuth()
  // @ApiParam({
  //   name: 'merchantId',
  //   type: 'String',
  //   required: true,
  // })
  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Merchant))
  // @Get('/:merchantId')
  // async findMerchantById(
  //   @Request() req,
  //   @Param() params,
  // ): Promise<FindMerchantByIdResponseDto> {
  //   // Nếu không phải chính user đó
  //   if (req.user.userId !== params.merchantId) {
  //     return {
  //       statusCode: 403,
  //       message: 'Unauthorized',
  //       data: null,
  //     };
  //   }
  //   return this.merchantService.findMerchantById(params.merchantId);
  // }
}
