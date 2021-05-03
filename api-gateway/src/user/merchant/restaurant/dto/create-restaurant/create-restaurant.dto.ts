import { OpenHourDto } from './open-hours-data.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsString, ValidateNested } from 'class-validator';
import { CategoryType } from '../../../../../shared/enum/category-type.enum';
import { GeospatialDataDto } from './geospatial-data.dto';
import { Type } from 'class-transformer';
import { OpenHoursDataExample } from './open-hours-data-example';

export class CreateRestaurantDto {
  @ApiProperty({ example: 'Quán Ăn Maika', required: true, description: 'Tên của nhà hàng' })
  @IsString()
  name: string;

  @ApiProperty({ example: '0949657934', required: true, description: 'Số điện thoại của nhà hàng' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '528 Nguyễn Trãi, P. 8, Quận 5, TP. HCM', required: true, description: 'Địa chỉ của nhà hàng' })
  @IsString()
  address: string;

  @ApiProperty({ required: true, description: 'Tọa độ trên bản đồ của nhà hàng' })
  @ValidateNested()
  geo: GeospatialDataDto;

  @ApiProperty({ example: 'Hồ Chí Minh', required: true, description: 'Thành phố' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'TPHCM', required: true, description: 'Khu vực' })
  @IsString()
  area: string;

  @ApiProperty({
    example: OpenHoursDataExample,
    required: true, description: 'Thời gian làm việc',
    type: [OpenHourDto]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpenHourDto)
  openHours: OpenHourDto[];

  @ApiProperty({
    example: [CategoryType.RESTAURANT], enum: CategoryType,
    required: true, description: 'Loại hình quán',
    type: [CategoryType]
  })
  @IsArray()
  @IsEnum(CategoryType, { each: true })
  categories: CategoryType[];

  @ApiProperty({ example: 'http://lorempixel.com/640/480', required: true, description: 'Ảnh hiển thị của nhà hàng' })
  @IsString()
  coverImageUrl: string;

  @ApiProperty({ example: 'http://lorempixel.com/640/480', required: true, description: 'Ảnh mặt tiền của quán để xác thực (toàn bộ mặt tiền, biển hiệu, số nhà, cửa chính của quán)' })
  @IsString()
  verifiedImageUrl: string;

  @ApiPropertyOptional({ example: '0', required: false, description: 'Link video đại diện của quán' })
  videoUrl?: string;
}
