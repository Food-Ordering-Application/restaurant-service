import { ApiProperty } from '@nestjs/swagger';

export class DeleteMenuGroupNotFoundResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;
  @ApiProperty({ example: 'Menu group not found', type: 'string' })
  message: string;
}
