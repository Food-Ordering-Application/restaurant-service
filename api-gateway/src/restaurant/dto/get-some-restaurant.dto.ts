import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Area, CategoryType } from '../enums';

export class GetSomeRestaurantDto {
  @ApiProperty({ example: 2, required: true })
  @IsInt()
  pageNumber: number;
  @ApiProperty({ example: Area.TPHCM, enum: Area, required: true })
  @IsString()
  area: string;
  @ApiProperty({
    example: CategoryType.CAFEDESSERT,
    enum: CategoryType,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  category?: string;
}
