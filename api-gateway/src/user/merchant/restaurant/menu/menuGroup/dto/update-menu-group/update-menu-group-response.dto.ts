import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuGroupResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Menu group updated successfully', type: 'string' })
  message: string;
}
