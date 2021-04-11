import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Hienhhcc', uniqueItems: true, required: true })
  @IsString()
  username: string;
  @ApiProperty({ minLength: 6, example: 'daylapasscuatui', required: true })
  @IsString()
  password: string;
}
