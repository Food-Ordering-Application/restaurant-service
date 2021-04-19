import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: '0123456789', uniqueItems: true, required: true })
  @IsString()
  phoneNumber: string;
  @ApiProperty({ minLength: 6, example: 'daylapasscuatui', required: true })
  @IsString()
  password: string;
}
