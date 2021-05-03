import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { DaysOfWeek } from '../../../../../shared/enum/day.enum';
export class OpenHourDto {
  @ApiProperty({ example: 8, required: true, description: 'Giờ mở cửa' })
  @IsNumber()
  fromHour: number;

  @ApiProperty({ example: 30, required: true, description: 'Phút mở cửa' })
  @IsNumber()
  fromMinute: number;

  @ApiProperty({ example: 22, required: true, description: 'Giờ đóng cửa' })
  @IsNumber()
  toHour: number;

  @ApiProperty({ example: 0, required: true, description: 'Phút đóng cửa' })
  @IsNumber()
  toMinute: number;

  @ApiProperty({ example: 'Thursday', enum: DaysOfWeek, required: true, description: 'Ngày trong tuần' })
  @IsEnum(DaysOfWeek)
  day: DaysOfWeek
}