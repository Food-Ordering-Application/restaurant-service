import { ApiProperty } from '@nestjs/swagger';

export class SendPhoneNumberOTPVerifyResponseDto {
  @ApiProperty({ example: 200, description: 'Return status code' })
  statusCode: number;
  @ApiProperty({ example: 'Send OTP successfully', type: 'string' })
  message: string;
}
