import { ApiProperty } from '@nestjs/swagger';
import { ICustomerData } from 'src/user/customer/interfaces/create-customer-data.interface';

export class FindCustomerByIdUnauthorizedResponseDto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      user: null,
    },
  })
  data: ICustomerData;
}
