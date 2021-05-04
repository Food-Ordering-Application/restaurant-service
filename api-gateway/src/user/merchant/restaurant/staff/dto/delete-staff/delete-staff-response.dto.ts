import { ApiProperty } from '@nestjs/swagger';
import { IStaffData } from '../../interfaces/create-staff-data.interface';

export class DeleteStaffResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Staff deleted successfully', type: 'string' })
  message: string;
}
