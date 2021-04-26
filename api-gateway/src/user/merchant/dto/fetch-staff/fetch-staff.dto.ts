import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class FetchStaffByMerchantDto {
  @ApiPropertyOptional({ example: '0', required: false, default: '0' })
  page?: string;

  @ApiPropertyOptional({ example: '10', required: false, default: '10' })
  size?: string;
}

