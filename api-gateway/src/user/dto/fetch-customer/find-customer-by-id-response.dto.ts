import { ApiProperty } from '@nestjs/swagger';
import { ICustomerData } from 'src/user/interfaces/create-customer-data.interface';

export class FindCustomerByIdResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Customer fetched successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      user: {
        id: '0c1df8c8-40b1-41b4-a897-702e09f1fd60',
        phoneNumber: '0123456789',
        name: 'Nguyễn Văn A',
        gender: 'Male',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/xravil/128.jpg',
        email: 'Lm82@yahoo.com',
        isPhoneNumberVerified: false,
      },
    },
    nullable: true,
  })
  data: ICustomerData;
}
