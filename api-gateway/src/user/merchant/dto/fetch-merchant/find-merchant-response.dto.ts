import { IMerchantData } from '../../interfaces/create-merchant-data.interface';
import { ApiProperty } from '@nestjs/swagger';

export class FindMerchantByIdResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({ example: 'User created successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      user: {
        id: "54a800a3-81a4-44d9-a79e-456660724000",
        username: "merchant123",
        email: "abc@gmail.com",
        phone: "0949654744",
        fullName: "Nguyễn Văn Phúc",
        IDNumber: "272699300"
      }
    },
    nullable: true,
  })
  data: IMerchantData;
}
