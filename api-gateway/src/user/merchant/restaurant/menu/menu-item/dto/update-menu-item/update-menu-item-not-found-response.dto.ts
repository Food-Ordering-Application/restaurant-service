import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuItemNotFoundResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;
  @ApiProperty({ example: 'Menu item not found', type: 'string' })
  message: string;
}
