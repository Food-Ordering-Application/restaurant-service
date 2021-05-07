import { POSITION_GAP } from '../../../../../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateMenuGroupDto {
  @ApiProperty({ example: 'Mì', required: true, description: 'Tên nhóm món ăn' })
  @IsString()
  name: string;

  @ApiProperty({ example: POSITION_GAP, required: true, description: `Vị trí (index của phần tử cuối cùng + ${POSITION_GAP})` })
  @IsNumber()
  index: number;

  @ApiProperty({ example: true, required: true, description: `Hiển thị` })
  @IsBoolean()
  isActive: boolean;
}

