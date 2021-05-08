import { ApiProperty } from '@nestjs/swagger';

export class UpdateToppingGroupResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Topping group updated successfully', type: 'string' })
  message: string;
}
