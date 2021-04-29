import { ApiProperty } from '@nestjs/swagger';
import { IVerifyAppKeyResponseData } from '../../interfaces';

export class VerifyAppKeyResponseDto {
  @ApiProperty({ example: 200, description: 'Return status code' })
  statusCode: number;
  @ApiProperty({
    example: 'Your key is verified',
    type: 'string',
  })
  message: string;

  @ApiProperty({
    example: {
      restaurantId: "967da9e1-230b-47f6-b482-2154023a7d96",
      merchantId: "967da9e1-230b-47f6-b482-2154023a7d96"
    }
  })
  data: IVerifyAppKeyResponseData;
}
