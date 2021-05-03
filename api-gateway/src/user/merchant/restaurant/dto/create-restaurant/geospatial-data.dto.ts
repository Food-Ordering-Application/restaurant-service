import { IsNumber } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class GeospatialDataDto {
  @ApiProperty({ example: 3.253, required: true, description: 'Kinh độ' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: -12.7589, required: true, description: 'Vĩ độ' })
  @IsNumber()
  longitude: number;
};