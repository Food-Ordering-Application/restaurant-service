import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from '../index';

export class LoginCustomerDto extends PartialType(CreateCustomerDto) {}
