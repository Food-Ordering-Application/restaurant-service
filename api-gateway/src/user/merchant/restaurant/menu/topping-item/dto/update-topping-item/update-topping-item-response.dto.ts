import { ApiProperty } from '@nestjs/swagger';

export class UpdateToppingItemResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Topping item updated successfully', type: 'string' })
  message: string;
}
