import {
  Controller,
  Post,
  Body,
  Logger,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateCustomerConflictResponseDto,
  CreateCustomerResponseDto,
  CreateCustomerDto,
} from './dto/create-customer/index';
import {
  LoginCustomerDto,
  LoginCustomerResponseDto,
  LoginCustomerUnauthorizedResponseDto,
} from './dto/login-customer/index';
import { CustomerService } from './customer.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SendPhoneNumberOTPVerifyResponseDto } from './dto/send-otp';
import {
  VerifyCustomerPhoneNumberDto,
  VerifyCustomerPhoneNumberUnauthorizedResponseDto,
  VerifyCustomerPhoneNumberResponseDto,
} from './dto/verify-customer-phone-number';
import { InternalServerErrorResponseDto } from './dto/internal-server-error.dto';
import { PoliciesGuard } from 'src/casl/guards/policy.guard';
import { CheckPolicies } from 'src/casl/decorators/check-policy.decorator';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action } from 'src/shared/enum/actions.enum';
import { Customer } from 'src/shared/classes';

@ApiTags('customers')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('customer')
export class CustomerController {
  private logger = new Logger('CustomerController');

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
  ) {}

  // Đăng ký Customer
  @ApiCreatedResponse({ type: CreateCustomerResponseDto })
  @ApiConflictResponse({ type: CreateCustomerConflictResponseDto })
  @ApiBody({ type: CreateCustomerDto })
  @Post()
  async registerCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CreateCustomerResponseDto> {
    return this.customerService.createCustomer(createCustomerDto);
  }

  // Đăng nhập Customer
  @ApiOkResponse({ type: LoginCustomerResponseDto })
  @ApiUnauthorizedResponse({ type: LoginCustomerUnauthorizedResponseDto })
  @ApiBody({ type: LoginCustomerDto })
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async loginCustomer(@Request() req): Promise<LoginCustomerResponseDto> {
    return this.authService.login(req.user);
  }

  // Gửi mã OTP
  @ApiOkResponse({ type: SendPhoneNumberOTPVerifyResponseDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('/send-otp')
  async sendOTPVerify(
    @Request() req,
  ): Promise<SendPhoneNumberOTPVerifyResponseDto> {
    return this.customerService.sendPhoneNumberOTPVerify(req.user);
  }

  // Verified OTP
  @ApiOkResponse({ type: VerifyCustomerPhoneNumberResponseDto })
  @ApiUnauthorizedResponse({
    type: VerifyCustomerPhoneNumberUnauthorizedResponseDto,
  })
  @ApiBody({ type: VerifyCustomerPhoneNumberDto })
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('/verify-otp')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Customer))
  async verifyCustomerPhoneNumber(
    @Request() req,
    @Body() verifyOtpDto: VerifyCustomerPhoneNumberDto,
  ): Promise<VerifyCustomerPhoneNumberResponseDto> {
    return this.customerService.verifyCustomerPhoneNumber(
      req.user,
      verifyOtpDto.otp,
    );
  }
}
