import { ApiProperty } from '@nestjs/swagger';

export class LoginCustomerUnauthorizedResponseDto {
  @ApiProperty({ example: 401 })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized', type: 'string' })
  message: string;
}
