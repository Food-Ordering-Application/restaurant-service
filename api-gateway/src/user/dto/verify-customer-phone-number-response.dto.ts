import { ApiProperty } from '@nestjs/swagger';

export class VerifyCustomerPhoneNumberResponseDto {
  @ApiProperty({ example: 200, description: 'Return status code' })
  statusCode: number;
  @ApiProperty({
    example: 'Verify customer phoneNumber successfully',
    type: 'string',
  })
  message: string;
}
