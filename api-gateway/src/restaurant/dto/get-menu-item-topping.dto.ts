import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetMenuItemToppingDto {
  @ApiProperty({
    example: 'c5965070-7787-4074-833d-9a2294e651a7',
    required: true,
  })
  @IsString()
  menuItemId: number;
}
