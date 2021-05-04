import { ApiProperty } from '@nestjs/swagger';

export class DeleteMenuGroupResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Menu group deleted successfully', type: 'string' })
  message: string;
}
