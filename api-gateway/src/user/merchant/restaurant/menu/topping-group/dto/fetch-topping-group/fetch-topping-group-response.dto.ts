import { POSITION_GAP } from '../../../../../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { IFetchToppingGroupData } from '../../interfaces';

export class FetchToppingGroupByMenuResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Fetch successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      "results": [
        {
          id: '54a800a3-81a4-44d9-a79e-456660724000',
          menuId: '148cd922-b73b-47d3-bada-facdf7b4ef54',
          name: 'Nước sốt',
          index: POSITION_GAP,
          isActive: true
        }
      ],
      size: 10,
      total: 1
    },
    nullable: true,
  })
  data: IFetchToppingGroupData;
}
