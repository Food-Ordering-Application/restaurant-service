import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IncreaseOrderItemQuantityDto {
  @ApiProperty({
    example: '50e26c95-383b-4cb2-a97c-1547433c6d3a',
    required: true,
  })
  @IsString()
  orderItemId: string;
}
