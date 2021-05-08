import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max } from 'class-validator';
import { Area, CategoryType } from '../enums';

export class GetSomeRestaurantDto {
  @ApiProperty({ example: 2, required: true })
  @IsInt()
  page: number;

  @ApiProperty({ example: 25, required: true })
  @IsInt()
  @Max(25)
  size: number;

  @ApiProperty({ example: Area.TPHCM, enum: Area, required: true })
  @IsString()
  area: string;

  @ApiProperty({ example: 'Ga', nullable: true })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({
    example: CategoryType.CAFEDESSERT,
    enum: CategoryType,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  category?: string;
}
