import {
  Controller,
  Post,
  Body,
  Logger,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateCustomerResponseDto } from './dto/create-customer-response.dto';
import { LoginCustomerResponseDto } from './dto/login-customer-response.dto';
import { CustomerService } from './customer.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('customers')
@Controller('customer')
export class CustomerController {
  private logger = new Logger('CustomerController');

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
  ) {}

  @ApiCreatedResponse({ type: CreateCustomerResponseDto })
  @Post()
  async registerCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CreateCustomerResponseDto> {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @ApiOkResponse({ type: LoginCustomerResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginCustomer(@Request() req): Promise<LoginCustomerResponseDto> {
    return this.authService.login(req.user);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
