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
      posAppKey: "AA67FE0722E2DF4B04B56399FA7CA96662E66DD3"
    }
  })
  data: IVerifyRestaurantResponseData;
}
