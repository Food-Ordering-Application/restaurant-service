import {
  Controller,
  Post,
  Body,
  Logger,
  UseGuards,
  Request,
  HttpCode,
  Get,
  Param,
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
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateCustomerConflictResponseDto,
  CreateCustomerResponseDto,
  CreateCustomerDto,
  LoginCustomerDto,
  LoginCustomerResponseDto,
  LoginCustomerUnauthorizedResponseDto,
  SendPhoneNumberOTPVerifyResponseDto,
  VerifyCustomerPhoneNumberDto,
  VerifyCustomerPhoneNumberUnauthorizedResponseDto,
  VerifyCustomerPhoneNumberResponseDto,
  FindCustomerByIdResponseDto,
} from './dto/index';
import { CustomerService } from './customer.service';
import { LocalAuthGuard } from 'src/auth/guards/locals/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwts/jwt-auth.guard';
import { InternalServerErrorResponseDto } from '../../shared/dto/internal-server-error.dto';
import { PoliciesGuard } from 'src/casl/guards/policy.guard';
import { CheckPolicies } from 'src/casl/decorators/check-policy.decorator';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action } from 'src/shared/enum/actions.enum';
import { Customer } from 'src/shared/classes';
import { FindCustomerByIdUnauthorizedResponseDto } from './dto/fetch-customer/find-customer-by-id-unauthorized.dto';

@ApiTags('customer')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/customer')
export class CustomerController {
  private logger = new Logger('CustomerController');

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
  ) { }

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
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Customer))
  @Post('/verify-otp')
  async verifyCustomerPhoneNumber(
    @Request() req,
    @Body() verifyOtpDto: VerifyCustomerPhoneNumberDto,
  ): Promise<VerifyCustomerPhoneNumberResponseDto> {
    this.logger.log(req.user);
    return this.customerService.verifyCustomerPhoneNumber(
      req.user,
      verifyOtpDto.otp,
    );
  }

  // Fetch customer data
  @ApiOkResponse({ type: FindCustomerByIdResponseDto })
  @ApiUnauthorizedResponse({ type: FindCustomerByIdUnauthorizedResponseDto })
  @ApiBearerAuth()
  @ApiParam({
    name: 'customerId',
    type: 'String',
    required: true,
  })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Customer))
  @Get('/:customerId')
  async findCustomerById(
    @Request() req,
    @Param() params,
  ): Promise<FindCustomerByIdResponseDto> {
    // Nếu không phải chính user đó
    if (req.user.userId !== params.customerId) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return this.customerService.findCustomerById(params.customerId);
  }
}
