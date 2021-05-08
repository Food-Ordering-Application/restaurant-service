import { ApiProperty } from '@nestjs/swagger';

export class UpdateToppingGroupNotFoundResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;
  @ApiProperty({ example: 'Topping group not found', type: 'string' })
  message: string;
}
