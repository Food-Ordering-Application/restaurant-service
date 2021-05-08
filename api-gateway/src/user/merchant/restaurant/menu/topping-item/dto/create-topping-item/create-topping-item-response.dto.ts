import { POSITION_GAP } from '../../../../../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { IToppingItemData } from '../../interfaces/create-topping-item-data.interface';

export class CreateToppingItemResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({ example: 'Topping item created successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      toppingItem: {
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
    },
  })
  data: IToppingItemData;
}
