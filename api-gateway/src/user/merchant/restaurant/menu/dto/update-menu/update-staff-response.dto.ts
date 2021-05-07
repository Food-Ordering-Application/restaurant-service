import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Menu updated successfully', type: 'string' })
  message: string;
}
