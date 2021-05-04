import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuGroupNotFoundResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;
  @ApiProperty({ example: 'Menu group not found', type: 'string' })
  message: string;
}
