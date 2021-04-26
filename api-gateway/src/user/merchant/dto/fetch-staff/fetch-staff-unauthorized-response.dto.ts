import { IStaffData } from '../../interfaces/create-staff-data.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IFetchStaffData } from '../../interfaces';
;

export class FetchStaffByMerchantUnauthorizedResponseDto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized', type: 'string' })
  message: string;
  @ApiProperty({
    example: null,
    nullable: true,
  })
  data: IFetchStaffData;
}
