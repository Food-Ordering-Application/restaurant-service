import { ApiProperty } from '@nestjs/swagger';
import { IGetMenuItemToppingsData } from '../interfaces';

export class GetMenuItemToppingInfoResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'MenuItemTopping fetched successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      toppingGroups: [
        {
          id: 'a018d218-6125-4e20-8796-d75e02734875',
          name: 'Moises Senger',
          index: 1,
          isActive: true,
          toppingItems: [
            {
              id: 'f9871bbd-e1c9-4fd6-9d12-428d35b22e30',
              description: 'Laborum amet harum nulla voluptatum est.',
              price: 95827,
              maxQuantity: 3,
              index: 1,
              isActive: true,
              menuItemToppings: [
                {
                  id: 'eee5a379-5775-4b85-bfa0-0dc88e6078f7',
                  customPrice: 15031,
                },
              ],
            },
            {
              id: '432564ab-a503-4636-b3ef-7ec50912c2a7',
              description:
                'Consectetur est velit neque totam omnis animi sapiente vitae iusto.',
              price: 35981,
              maxQuantity: 3,
              index: 1,
              isActive: true,
              menuItemToppings: [
                {
                  id: '340f5529-76c5-4def-826c-c6767a67ed69',
                  customPrice: 16188,
                },
              ],
            },
            {
              id: 'c16d7ffb-5a11-4a58-821d-74437197a4aa',
              description: 'Eos nam exercitationem corporis quae.',
              price: 58682,
              maxQuantity: 3,
              index: 1,
              isActive: true,
              menuItemToppings: [
                {
                  id: 'f6fbe937-4315-48bc-9dd4-ee720312eda8',
                  customPrice: 9041,
                },
              ],
            },
          ],
        },
        {
          id: '13078795-e093-4969-a551-63182e27c94a',
          name: 'Shannon Osinski',
          index: 1,
          isActive: true,
          toppingItems: [
            {
              id: 'b7877ab3-a60c-48f4-a572-c9ebb53f2972',
              description: 'Et voluptatem iure modi velit quos id ullam.',
              price: 66503,
              maxQuantity: 3,
              index: 1,
              isActive: true,
              menuItemToppings: [
                {
                  id: '57c72bbb-260e-47a1-8f31-7b9de68b0990',
                  customPrice: 14871,
                },
              ],
            },
            {
              id: 'c467ab52-949d-48e7-aae9-df3d045453f5',
              description: 'Molestias voluptate quis reiciendis sunt.',
              price: 83659,
              maxQuantity: 3,
              index: 1,
              isActive: true,
              menuItemToppings: [
                {
                  id: 'fdab4dbf-66de-4ff1-b8cc-6ae56149ab9a',
                  customPrice: 8602,
                },
              ],
            },
            {
              id: 'c3049d31-8c1b-4a59-aed3-0b8bd7541f4d',
              description: 'Qui qui labore voluptatem enim accusantium.',
              price: 72132,
              maxQuantity: 3,
              index: 1,
              isActive: true,
              menuItemToppings: [
                {
                  id: 'a5fc23ca-e11f-439c-8a09-2dce26a22d06',
                  customPrice: 18433,
                },
              ],
            },
          ],
        },
        {
          id: '40ad52e1-3eea-4cd0-9515-a84cebe7f3f4',
          name: 'Ernie Pagac',
          index: 1,
          isActive: true,
          toppingItems: [
            {
              id: '6f348905-21e9-4507-9ace-7752c4b1a37b',
              description: 'Temporibus sint temporibus et consequatur ut.',
              price: 87838,
              maxQuantity: 3,
              index: 1,
              isActive: true,
              menuItemToppings: [
                {
                  id: '57d4f44c-b404-4cbd-915e-4bc04beae696',
                  customPrice: 8939,
                },
              ],
            },
            {
              id: '75a31889-0933-468a-b2aa-0ddb46f1a2ea',
              description: 'Rerum repellendus qui.',
              price: 59198,
              maxQuantity: 3,
              index: 1,
              isActive: true,
              menuItemToppings: [
                {
                  id: '4c161937-9766-41c4-a4f4-5d592c5f202d',
                  customPrice: 18669,
                },
              ],
            },
            {
              id: 'accdc1b3-fe0d-4419-a66e-5af44976b975',
              description: 'Ea sint enim autem.',
              price: 79930,
              maxQuantity: 3,
              index: 1,
              isActive: true,
              menuItemToppings: [
                {
                  id: '37942674-adbe-423d-be65-a0eb626a47fd',
                  customPrice: 19718,
                },
              ],
            },
          ],
        },
      ],
    },
    nullable: true,
  })
  data: IGetMenuItemToppingsData;
}
