import { ApiProperty } from '@nestjs/swagger';
;

export class UpdateMenuNotFoundResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;
  @ApiProperty({ example: 'Menu not found', type: 'string' })
  message: string;
}
