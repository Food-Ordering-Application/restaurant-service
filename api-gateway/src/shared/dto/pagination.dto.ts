import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({ example: '0', required: false, default: '0' })
  page?: string;

  @ApiPropertyOptional({ example: '10', required: false, default: '10' })
  size?: string;
}

