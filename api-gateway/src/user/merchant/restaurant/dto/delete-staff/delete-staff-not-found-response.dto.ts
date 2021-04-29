import { ApiProperty } from '@nestjs/swagger';
import { IStaffData } from '../../interfaces/create-staff-data.interface';
;

export class DeleteStaffNotFoundResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;
  @ApiProperty({ example: 'Staff not found', type: 'string' })
  message: string;
}
