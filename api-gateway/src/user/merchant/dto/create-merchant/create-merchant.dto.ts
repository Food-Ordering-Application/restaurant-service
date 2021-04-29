import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateMerchantDto {
  @ApiProperty({ example: 'merchant123', uniqueItems: true, required: true })
  @IsString()
  username: string;

  @ApiProperty({ minLength: 6, example: '123123', required: true })
  @IsString()
  password: string;

  @ApiProperty({ example: 'abc@gmail.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '0949654744', required: true })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'Nguyễn Văn Phúc', required: true })
  @IsString()
  fullName: string;

  @ApiProperty({ example: '272699300', required: true })
  @IsString()
  IDNumber: string;
}

