import { ApiProperty } from '@nestjs/swagger';
import { ILoginAdminData } from './../../interfaces/login-admin-data.interface';

export class LoginAdminResponseDto {
  @ApiProperty({ example: 200, description: 'Return status code' })
  statusCode: number;
  @ApiProperty({ example: 'Login successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      user: {
        id: '0c1df8c8-40b1-41b4-a897-702e09f1fd60',
        username: 'admin123',
      },
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaHlldWVtZSIsImlhdCI6MTYxODA2MjY0MSwiZXhwIjoxNjE4MTQ5MDQxfQ.l_r4Nufo7XW8KVvYnvvtYYwqTlfveTY7qEJwx9ByBFg',
    },
    nullable: true,
  })
  data: ILoginAdminData;
}
