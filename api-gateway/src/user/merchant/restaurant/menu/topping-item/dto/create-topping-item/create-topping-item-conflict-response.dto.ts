import { ApiProperty } from '@nestjs/swagger';

export class CreateToppingItemConflictResponseDto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Conflict', type: 'string' })
  message: string;
}
