import { ApiProperty } from '@nestjs/swagger';
import { IStaffData } from '../../interfaces/create-staff-data.interface';
;

export class UpdateStaffNotFoundResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;
  @ApiProperty({ example: 'Staff not found', type: 'string' })
  message: string;
}
