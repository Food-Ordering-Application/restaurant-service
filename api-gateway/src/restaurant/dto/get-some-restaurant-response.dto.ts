import { ApiProperty } from '@nestjs/swagger';
import { IRestaurantsData } from '../interfaces/multiple-restaurant-data.interface';

export class GetSomeRestaurantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Restaurant fetched successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      restaurants: [
        {
          id: '06aa7d41-e33f-4682-9aeb-f4d22a0244a6',
          name: 'Mr. Hồ Bửu',
          coverImageUrl: 'http://lorempixel.com/640/480',
          address: '16055 Phan Isle',
          isActive: true,
          categories: [
            {
              id: '06aa7d41-e33f-4682-9aeb-f4d22a0244a6',
              type: 'CAFEDESSERT',
            },
          ],
        },
        {
          id: '19218c09-4441-4ac9-87b4-404d9946c9f3',
          name: 'Hà Dương',
          coverImageUrl: 'http://lorempixel.com/640/480',
          address: '91197 Thủy Villages',
          isActive: true,
          categories: [
            {
              id: '06aa7d41-e33f-4682-9aeb-f4d22a0244a6',
              type: 'CAFEDESSERT',
            },
            {
              id: '19218c09-4441-4ac9-87b4-404d9946c9f3',
              type: 'STREETFOOD',
            },
          ],
        },
      ],
    },
    nullable: true,
  })
  data: IRestaurantsData;
}
