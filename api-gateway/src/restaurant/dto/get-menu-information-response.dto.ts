import { ApiProperty } from '@nestjs/swagger';
import { IGetMenuAndMenuGroupsAndMenuItemsData } from '../interfaces';

export class GetMenuInformationResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Menu,groups,items fetched successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      menu: {
        id: 'c5965070-7787-4074-833d-9a2294e651a7',
        name: 'Lew Quitzon',
        index: 1,
      },
      menuGroups: [
        {
          id: '7d171f8c-2dd2-4bbe-870a-71461280edd9',
          name: 'Mrs. Ethyl Feest',
          index: 1,
          menuItems: [
            {
              id: '766ce881-ae50-4ac4-9225-d271b74591b7',
              name: 'Meredith Gutmann',
              description: 'Perferendis dolores corrupti.',
              price: 16815,
              imageUrl: 'http://lorempixel.com/640/480',
              index: 1,
              isActive: true,
            },
            {
              id: 'd2408838-8d02-4529-9552-cbbddacf800e',
              name: 'Laila Jast',
              description:
                'Aut dolore est architecto et ad at repellendus iure harum.',
              price: 5670,
              imageUrl: 'http://lorempixel.com/640/480',
              index: 1,
              isActive: true,
            },
          ],
        },
        {
          id: '65f9e7e5-b539-424a-9a93-3ebd1b20d426',
          name: 'Selina Kovacek',
          index: 1,
          menuItems: [
            {
              id: '7e1bd12f-dfc8-448f-b0c5-e49b2ca7674e',
              name: 'Jazmin Bednar IV',
              description: 'Tenetur quia rerum eius illo.',
              price: 19666,
              imageUrl: 'http://lorempixel.com/640/480',
              index: 1,
              isActive: true,
            },
            {
              id: '04ccdd51-f109-4f6a-b825-fd8244ea4bb3',
              name: 'Mr. Litzy Swaniawski',
              description:
                'Perferendis repudiandae voluptatum eos occaecati ducimus voluptates maxime quia iste.',
              price: 7324,
              imageUrl: 'http://lorempixel.com/640/480',
              index: 1,
              isActive: true,
            },
          ],
        },
        {
          id: '4652c588-05e1-4197-9ace-4d9c5b337992',
          name: 'Kristin Lesch',
          index: 1,
          menuItems: [
            {
              id: '2b76f76b-e244-46c3-a880-597cdf492b10',
              name: 'Gunner Muller',
              description: 'Neque officiis aliquam quia vero corrupti.',
              price: 8096,
              imageUrl: 'http://lorempixel.com/640/480',
              index: 1,
              isActive: true,
            },
            {
              id: 'c6e958a5-838c-4f1c-8159-9a49a2f9f3a1',
              name: 'Lambert Borer MD',
              description:
                'Error voluptas officia quo optio fuga aut est voluptate fugit.',
              price: 5723,
              imageUrl: 'http://lorempixel.com/640/480',
              index: 1,
              isActive: true,
            },
          ],
        },
      ],
    },
    nullable: true,
  })
  data: IGetMenuAndMenuGroupsAndMenuItemsData;
}
