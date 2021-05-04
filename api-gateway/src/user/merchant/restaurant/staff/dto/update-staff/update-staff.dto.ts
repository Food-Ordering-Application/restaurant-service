import { ApiProperty, PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateStaffFullDto {
  @ApiPropertyOptional({ example: '0949654744', required: false })
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'Phúc', required: false })
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Nguyễn Văn', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: '272699300', required: false })
  @IsString()
  IDNumber?: string;

  @ApiPropertyOptional({ example: '1999-01-01', required: false })
  @IsDateString()
  dateOfBirth?: Date;
}

export class UpdateStaffDto extends PartialType(UpdateStaffFullDto) { }
