import { POSITION_GAP } from '../../../../../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { IFetchToppingItemData } from '../../interfaces';

export class FetchToppingItemByMenuResponseDto {
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
          toppingGroupId: '148cd922-b73b-47d3-bada-facdf7b42354',
          name: 'Nước sốt Hàn Quốc',
          description: 'Nước sốt Hàn Quốc vị cay',
          price: 9000,
          maxQuantity: 2,
          index: POSITION_GAP,
          isActive: true
        }
      ],
      size: 10,
      total: 1
    },
    nullable: true,
  })
  data: IFetchToppingItemData;
}
