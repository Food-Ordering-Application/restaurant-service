import { ApiProperty } from '@nestjs/swagger';
import { IMenu } from '../../interfaces';

export class CreateMenuResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({ example: 'Menu was created', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      menu: {
        id: 'b060a64c-e887-4180-92be-7c0689a966d4',
        restaurantId: 'a919dc5a-0652-4253-bedd-21b5df5dd52f',
        name: 'Thực đơn',
        isActive: true,
      },
    },
    nullable: true,
  })
  data: {
    menu: IMenu
  };
}
