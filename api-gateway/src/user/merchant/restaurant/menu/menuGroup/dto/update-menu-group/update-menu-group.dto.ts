import { POSITION_GAP } from './../../../../../../../constants';
import { ApiProperty, PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMenuGroupFullDto {
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

export class UpdateMenuGroupDto extends PartialType(UpdateMenuGroupFullDto) { }
