import { ApiProperty } from '@nestjs/swagger';
import { IFetchMenuData } from '../../interfaces/fetch-menu-data.interface';

export class FetchMenuOfRestaurantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Fetch successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      "results": [
        {
          id: 'b060a64c-e887-4180-92be-7c0689a966d4',
          restaurantId: 'a919dc5a-0652-4253-bedd-21b5df5dd52f',
          name: 'Thực đơn',
          isActive: true,
        },
      ],
      size: 10,
      total: 1
    },
    nullable: true,
  })
  data: IFetchMenuData;
}
