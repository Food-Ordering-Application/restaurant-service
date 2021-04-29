import { ApiProperty } from '@nestjs/swagger';
import { IStaffData } from '../../interfaces/create-staff-data.interface';

export class UpdateStaffResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Staff updated successfully', type: 'string' })
  message: string;
}
