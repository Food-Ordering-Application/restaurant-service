import { ApiProperty } from '@nestjs/swagger';

export class UpdateToppingItemNotFoundResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;
  @ApiProperty({ example: 'Topping item not found', type: 'string' })
  message: string;
}
