import { ApiProperty } from '@nestjs/swagger';
import { IFetchStaffData } from '../../interfaces';
import { IFetchRestaurantData } from '../../interfaces/fetch-restaurant-data.interface';

export class FetchRestaurantsOfMerchantUnauthorizedResponseDto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized', type: 'string' })
  message: string;
  @ApiProperty({
    example: null,
    nullable: true,
  })
  data: IFetchRestaurantData;
}
