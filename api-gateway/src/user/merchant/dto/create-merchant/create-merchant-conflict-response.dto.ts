import { IMerchantData } from './../../interfaces/create-merchant-data.interface';
import { ApiProperty } from '@nestjs/swagger';
;

export class CreateMerchantConflictResponseDto {
  @ApiProperty({ example: 409 })
  statusCode: number;
  @ApiProperty({ example: 'User already exists', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      user: null,
    },
    nullable: true,
  })
  data: IMerchantData;
}
