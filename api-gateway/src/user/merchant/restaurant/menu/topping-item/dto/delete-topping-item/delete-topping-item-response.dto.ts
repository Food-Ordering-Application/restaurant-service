import { ApiProperty } from '@nestjs/swagger';

export class DeleteToppingItemResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Topping item deleted successfully', type: 'string' })
  message: string;
}
