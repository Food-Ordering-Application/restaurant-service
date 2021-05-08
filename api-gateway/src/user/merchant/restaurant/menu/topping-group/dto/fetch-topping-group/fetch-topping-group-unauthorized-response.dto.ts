import { ApiProperty } from '@nestjs/swagger';
import { IFetchToppingGroupData } from '../../interfaces';

export class FetchToppingGroupByMenuUnauthorizedResponseDto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized', type: 'string' })
  message: string;
  @ApiProperty({
    example: null,
    nullable: true,
  })
  data: IFetchToppingGroupData;
}
