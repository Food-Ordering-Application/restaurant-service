import { ApiProperty } from '@nestjs/swagger';
import { IStaffData } from './../../interfaces/create-staff-data.interface';
;

export class CreateStaffConflictResponseDto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      staff: null,
    },
    nullable: true,
  })
  data: IStaffData;
}
