import { ApiProperty } from '@nestjs/swagger';

export class FetchMenuItemByMenuUnauthorizedResponseDto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized', type: 'string' })
  message: string;
}
