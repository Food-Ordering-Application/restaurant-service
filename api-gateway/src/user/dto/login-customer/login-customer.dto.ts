import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from '../create-customer/index';

export class LoginCustomerDto extends PartialType(CreateCustomerDto) {}
