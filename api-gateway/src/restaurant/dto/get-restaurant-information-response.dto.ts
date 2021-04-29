import { ApiProperty } from '@nestjs/swagger';
import { IRestaurantData } from '../interfaces';

export class GetRestaurantInformationResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Restaurant fetched successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      restaurant: {
        id: 'a33a9fc6-ecd1-4ad0-a378-66b0fc46d88f',
        owner: 'dea8f8c7-3235-4d57-b686-11b286b09a89',
        name: 'Tô Đặng',
        phone: '0568334216',
        coverImageUrl: 'http://lorempixel.com/640/480',
        verifiedImageUrl: 'http://lorempixel.com/640/480',
        videoUrl: 'https://www.youtube.com/watch?v=PrJtiLE42PM&t=1s',
        numRate: 760,
        rating: 5,
        address: '50297 Lê Hill',
        city: 'West Hàshire',
        area: 'BINHDUONG',
        geom: {
          type: 'Point',
          coordinates: [-155.3201, -14.2461],
        },
        isActive: true,
        isVerified: true,
        categories: [
          {
            id: 'a0d11ba0-ab5d-4c5f-89ae-17d3b942d0de',
            type: 'CAFEDESSERT',
          },
        ],
      },
    },
    nullable: true,
  })
  data: IRestaurantData;
}
