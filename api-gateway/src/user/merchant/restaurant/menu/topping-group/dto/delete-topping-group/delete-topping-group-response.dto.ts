import { ApiProperty } from '@nestjs/swagger';

export class DeleteToppingGroupResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Topping group deleted successfully', type: 'string' })
  message: string;
}
