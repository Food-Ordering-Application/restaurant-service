import { IVerifyRestaurantResponseData } from './../../interfaces/verify-restaurant-response-data';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyRestaurantResponseDto {
  @ApiProperty({ example: 200, description: 'Return status code' })
  statusCode: number;
  @ApiProperty({
    example: 'Verify restaurant successfully',
    type: 'string',
  })
  message: string;

  @ApiProperty({
    example: {
      posAppKey: "1234-1234-1234"
    }
  })
  data: IVerifyRestaurantResponseData;
}
