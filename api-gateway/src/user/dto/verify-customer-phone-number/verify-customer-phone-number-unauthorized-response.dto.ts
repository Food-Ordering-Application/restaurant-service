import { ApiProperty } from '@nestjs/swagger';

export class VerifyCustomerPhoneNumberUnauthorizedResponseDto {
  @ApiProperty({ example: 401 })
  statusCode: number;
  @ApiProperty({
    example: 'OTP not match',
    type: 'string',
  })
  message: string;
}
