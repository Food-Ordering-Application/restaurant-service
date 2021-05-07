import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuItemResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Menu item updated successfully', type: 'string' })
  message: string;
}
