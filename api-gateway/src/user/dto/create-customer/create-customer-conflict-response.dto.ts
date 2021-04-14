import { ApiProperty } from '@nestjs/swagger';
import { ICreateCustomerData } from 'src/user/interfaces/create-customer-data.interface';

export class CreateCustomerConflictResponseDto {
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
  data: ICreateCustomerData;
}
