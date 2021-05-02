import { ApiProperty } from '@nestjs/swagger';
import { IFetchStaffData } from '../../interfaces';
import { IFetchRestaurantData } from '../../interfaces/fetch-restaurant-data.interface';

export class FetchRestaurantsOfMerchantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Fetch successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      "results": [
        {
          id: "b060a64c-e887-4180-92be-7c0689a966d4",
          merchantId: "a919dc5a-0652-4253-bedd-21b5df5dd52f",
          username: "staff124",
          firstName: "Phúc",
          lastName: "Nguyễn Văn",
          fullName: "Nguyễn Văn Phúc",
          phone: "0949654744",
          IDNumber: "272699300",
          dateOfBirth: "1999-01-01"
        },
      ],
      size: 10,
      total: 1
    },
    nullable: true,
  })
  data: IFetchRestaurantData;
}
