import { ApiProperty } from '@nestjs/swagger';
import { IStaffData } from './../../interfaces/create-staff-data.interface';

export class CreateStaffResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({ example: 'User created successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      user: {
        id: "54a800a3-81a4-44d9-a79e-456660724000",
        username: "staff123",
        phone: "0949654744",
        fullName: "Nguyễn Văn Phúc",
        firstName: "Phúc",
        lastName: "Nguyễn Văn",
        IDNumber: "272699300"
      }
    },
    nullable: true,
  })
  data: IStaffData;
}
