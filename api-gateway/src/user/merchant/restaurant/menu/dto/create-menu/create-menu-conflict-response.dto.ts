import { ApiProperty } from '@nestjs/swagger';
import { IMenu } from '../../interfaces';

export class CreateMenuConflictResponseDto {
  @ApiProperty({ example: 409 })
  statusCode: number;
  @ApiProperty({ example: 'Restaurant already has menu', type: 'string' })
  message: string;
  @ApiProperty({
    example: null
  })
  data: any;
}
