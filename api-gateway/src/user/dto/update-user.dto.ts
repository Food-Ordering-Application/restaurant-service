import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer';

export class UpdateUserDto extends PartialType(CreateCustomerDto) {}
