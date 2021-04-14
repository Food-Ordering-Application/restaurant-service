import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyCustomerPhoneNumberDto {
  @ApiProperty({ example: '123456', required: true })
  @IsString()
  otp: string;
}
