import { IMerchantData } from '../../interfaces/create-merchant-data.interface';
import { ApiProperty } from '@nestjs/swagger';
;

export class FindMerchantByIdUnauthorizedResponseDto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      user: null,
    },
    nullable: true,
  })
  data: IMerchantData;
}
