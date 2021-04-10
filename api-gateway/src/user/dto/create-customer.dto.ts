import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Hienhhcc', uniqueItems: true, required: true })
  username: string;
  @ApiProperty({ minLength: 6, example: 'daylapasscuatui', required: true })
  password: string;
}
