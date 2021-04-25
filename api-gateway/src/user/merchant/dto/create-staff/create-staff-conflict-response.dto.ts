import { ApiProperty } from '@nestjs/swagger';
import { IStaffData } from './../../interfaces/create-staff-data.interface';
;

export class CreateStaffConflictResponseDto {
  @ApiProperty({ example: 409 })
  statusCode: number;
  @ApiProperty({ example: 'Username already exists', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      user: null,
    },
    nullable: true,
  })
  data: IStaffData;
}
