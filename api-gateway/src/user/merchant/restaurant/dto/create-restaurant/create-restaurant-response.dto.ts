import { ApiProperty } from '@nestjs/swagger';
import { IRestaurant } from '../../interfaces';

export class CreateRestaurantResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({ example: 'Restaurant was created', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      restaurant: {
        id: "12221ed2-0527-481b-9f3f-4ff63f2a513b",
        name: "Quán Ăn Maika",
        owner: "66bf562e-9c86-457f-b7dd-13f73a3a9126",
        coverImageUrl: "http://lorempixel.com/640/480",
        videoUrl: "0",
        address: "528 Nguyễn Trãi, P. 8, Quận 5, TP. HCM",
        city: "Hồ Chí Minh",
        area: "TPHCM",
        phone: "0949657934"
      }
    },
    nullable: true,
  })
  data: {
    restaurant: IRestaurant
  };
}
