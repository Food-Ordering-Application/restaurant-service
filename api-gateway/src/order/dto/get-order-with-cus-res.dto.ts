import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetOrderAssociatedWithCusAndResDto {
  @ApiProperty({
    example: '50e26c95-383b-4cb2-a97c-1547433c6d3a',
    required: true,
  })
  @IsString()
  restaurantId: string;

  @ApiProperty({
    example: '6c94e9b7-aa4f-44c8-bf21-91dd1da2dc2d',
    required: true,
  })
  @IsString()
  customerId: string;
}
