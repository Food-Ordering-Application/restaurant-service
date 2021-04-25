import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({ example: 'staff123', uniqueItems: true, required: true })
  @IsString()
  username: string;

  @ApiProperty({ minLength: 6, example: '123123', required: true })
  @IsString()
  password: string;

  @ApiProperty({ example: '0949654744', required: true })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'Phúc', required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Nguyễn Văn', required: true })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '272699300', required: true })
  @IsString()
  IDNumber: string;

  @ApiProperty({ example: 's', required: true })
  @IsDate()
  dateOfBirth: Date;
}

