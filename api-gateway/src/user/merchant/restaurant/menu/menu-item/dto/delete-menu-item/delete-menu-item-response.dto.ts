import { ApiProperty } from '@nestjs/swagger';

export class DeleteMenuItemResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Menu item deleted successfully', type: 'string' })
  message: string;
}
