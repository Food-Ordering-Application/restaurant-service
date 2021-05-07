import { POSITION_GAP } from './../../../../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ example: '148cd922-b73b-47d3-bada-facdf7b4ef54', required: true, description: 'Id của nhà hàng' })
  @IsUUID()
  restaurantId: string;

  @ApiProperty({ example: 'Thực đơn', required: true, description: 'Tên của menu' })
  @IsString()
  name: string;

  @ApiProperty({ example: true, required: true, description: `Hiển thị` })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: POSITION_GAP, required: true, description: `Vị trí (index của phần tử cuối cùng + ${POSITION_GAP})` })
  @IsNumber()
  index: number;
}
