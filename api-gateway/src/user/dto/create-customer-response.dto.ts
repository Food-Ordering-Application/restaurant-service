import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.interface';

export class CreateCustomerResponseDto {
  /**
   * Status code
   * @example 201
   */
  statusCode: number;
  @ApiProperty({ example: 'User created successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      user: {
        id: '0c1df8c8-40b1-41b4-a897-702e09f1fd60',
        phoneNumber: '0123456789',
      },
    },
    nullable: true,
  })
  data: {
    user: IUser;
  };
  // @ApiProperty({ example: null, nullable: true })
  // errors: { [key: string]: any };
}
