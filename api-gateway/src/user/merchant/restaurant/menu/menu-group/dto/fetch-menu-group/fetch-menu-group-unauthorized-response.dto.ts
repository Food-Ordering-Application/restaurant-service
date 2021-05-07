import { ApiProperty } from '@nestjs/swagger';
import { IFetchMenuGroupData } from '../../interfaces';

export class FetchMenuGroupByMenuUnauthorizedResponseDto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized', type: 'string' })
  message: string;
  @ApiProperty({
    example: null,
    nullable: true,
  })
  data: IFetchMenuGroupData;
}
