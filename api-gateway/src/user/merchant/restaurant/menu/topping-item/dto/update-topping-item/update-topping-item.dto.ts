import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';
import { POSITION_GAP } from '../../../../../../../constants';

export class UpdateToppingItemFullDto {
  @ApiProperty({ example: '148cd922-b73b-47d3-bada-facdf7b42354', required: true, nullable: false, description: 'Mã nhóm topping' })
  @IsUUID()
  toppingGroupId: string;

  @ApiProperty({ example: 'Nước sốt Hàn Quốc', required: true, description: 'Tên topping' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Nước sốt Hàn Quốc vị cay', required: true, description: 'Mô tả topping' })
  @IsString()
  description: string;

  @ApiProperty({ example: 9000, required: true, description: 'Giá của topping' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1, required: true, description: 'Số lượng topping tối đa cho một món' })
  @IsNumber()
  maxQuantity: number;

  @ApiProperty({ example: true, required: true, description: `Hiển thị` })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: POSITION_GAP, required: true, description: `Vị trí (index của phần tử cuối cùng + ${POSITION_GAP})` })
  @IsNumber()
  index: number;
}

export class UpdateToppingItemDto extends PartialType(UpdateToppingItemFullDto) { }
