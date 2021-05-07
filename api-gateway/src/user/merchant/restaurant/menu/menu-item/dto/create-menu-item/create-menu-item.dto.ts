import { POSITION_GAP } from '../../../../../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateMenuItemDto {
  @ApiProperty({ example: '148cd922-b73b-47d3-bada-facdf7b42354', required: true, nullable: false, description: 'Mã nhóm món ăn' })
  @IsUUID()
  menuGroupId: string;

  @ApiProperty({ example: 'Mì cay', required: true, description: 'Tên món ăn' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Mì cay Hàn Quốc', required: true, description: 'Mô tả món ăn' })
  @IsString()
  description: string;

  @ApiProperty({ example: 40000, required: true, description: 'Giá của món ăn' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'http://lorempixel.com/640/480', required: true, description: 'Ảnh hiển thị của món ăn' })
  @IsString()
  imageUrl: string;

  @ApiProperty({ example: true, required: true, description: `Hiển thị` })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: POSITION_GAP, required: true, description: `Vị trí (index của phần tử cuối cùng + ${POSITION_GAP})` })
  @IsNumber()
  index: number;
}

