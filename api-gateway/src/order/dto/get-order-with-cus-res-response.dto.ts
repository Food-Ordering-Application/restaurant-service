import { ApiProperty } from '@nestjs/swagger';
import { IOrderData } from '../interfaces';

export class GetOrderAssociatedWithCusAndResResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Draft order fetched successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      order: {
        id: '714f77cd-b0b3-4b88-ad4f-56c4c719b7cc',
        customerId: '91951471-619d-4aab-925d-6b55a0b4b8f4',
        driverId: null,
        restaurantId: '537c434c-ccda-49f3-b35a-328839dd7288',
        subTotal: 83000,
        itemDiscount: null,
        shippingFee: 15000,
        serviceFee: 2000,
        discount: null,
        grandTotal: 100000,
        createdAt: '2021-04-27T15:50:31.010Z',
        updatedAt: '2021-04-27T15:50:31.010Z',
        deliveredAt: null,
        orderItems: [
          {
            id: 'a39f61de-606d-4aba-957f-576cffe84f90',
            menuItemId: 'c2a99a7a-e0a1-4494-8e7e-e53558b9a8e3',
            price: 20000,
            quantity: 3,
            discount: 0,
            state: 'IN_STOCK',
            orderItemToppings: [
              {
                id: 'e012906b-c4d0-4454-91f0-858aa16a207d',
                menuItemToppingId: 'b8f50011-4af5-4e25-b465-37e88f2a11d4',
                quantity: 1,
                price: 5000,
                state: 'IN_STOCK',
              },
              {
                id: '4d019313-d418-4f88-ac50-bcee67c47e91',
                menuItemToppingId: '79c03599-c90a-457f-9854-47b29287b042',
                quantity: 2,
                price: 9000,
                state: 'IN_STOCK',
              },
            ],
          },
        ],
      },
    },
    nullable: true,
  })
  data: IOrderData;
}
