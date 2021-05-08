import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { POSITION_GAP } from '../../../../../../../constants';

export class UpdateToppingGroupFullDto {
  @ApiProperty({ example: 'Nước sốt', required: true, description: 'Tên nhóm topping' })
  @IsString()
  name: string;

  @ApiProperty({ example: POSITION_GAP, required: true, description: `Vị trí (index của phần tử cuối cùng + ${POSITION_GAP})` })
  @IsNumber()
  index: number;

  @ApiProperty({ example: true, required: true, description: `Hiển thị` })
  @IsBoolean()
  isActive: boolean;
}

export class UpdateToppingGroupDto extends PartialType(UpdateToppingGroupFullDto) { }
