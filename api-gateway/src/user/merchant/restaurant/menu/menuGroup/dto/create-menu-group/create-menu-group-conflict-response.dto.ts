import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuGroupConflictResponseDto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Conflict', type: 'string' })
  message: string;
}
