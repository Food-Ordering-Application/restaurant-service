import { POSITION_GAP } from '../../../../../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { IMenuGroupData } from '../../interfaces/create-menu-group-data.interface';

export class CreateMenuGroupResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({ example: 'Menu group created successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      menuGroup: {
        id: '54a800a3-81a4-44d9-a79e-456660724000',
        menuId: '148cd922-b73b-47d3-bada-facdf7b4ef54',
        name: 'Mì',
        index: POSITION_GAP,
        isActive: true
      }
    },
  })
  data: IMenuGroupData;
}
