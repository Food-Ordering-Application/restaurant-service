import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorResponseDto {
  @ApiProperty({ example: 500 })
  statusCode: number;
  @ApiProperty({ example: 'Something went wrong on server', type: 'string' })
  message: string;
}
