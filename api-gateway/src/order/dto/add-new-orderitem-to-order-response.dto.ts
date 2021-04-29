import { ApiProperty } from '@nestjs/swagger';
import { IOrderData } from '../interfaces';

export class AddNewItemToOrderResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'New orderItem added successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      order: {
        id: '4323d8c3-a5da-4e28-a8bf-5783338029a1',
        customerId: '8de3338c-2199-46c6-9dbf-6d2f72d1076e',
        driverId: null,
        restaurantId: '1aa41d9a-c39b-4fc9-9b63-2895b39883aa',
        subTotal: 146000,
        itemDiscount: null,
        shippingFee: 15000,
        serviceFee: 2000,
        discount: null,
        grandTotal: 163000,
        createdAt: '2021-04-28T05:32:45.216Z',
        updatedAt: '2021-04-28T05:37:16.883Z',
        deliveredAt: null,
        orderItems: [
          {
            id: '2529c0d0-3870-45fe-bc1f-3740ed9cfa40',
            menuItemId: 'c2a99a7a-e0a1-4494-8e7e-e53558b9a8e3',
            price: 20000,
            quantity: 3,
            discount: 0,
            state: 'IN_STOCK',
            orderItemToppings: [
              {
                id: '7b2c5678-f483-4153-a560-4fdf2a962498',
                menuItemToppingId: 'df0c2174-ecb4-4f03-bbef-16d55921c963',
                quantity: 1,
                price: 5000,
                state: 'IN_STOCK',
              },
              {
                id: '3352b4a3-9b86-4f09-8982-c53cfa46a1d0',
                menuItemToppingId: '8a03aa18-50f6-40ab-a460-c14a57f88205',
                quantity: 2,
                price: 9000,
                state: 'IN_STOCK',
              },
            ],
          },
          {
            menuItemId: '86c13d8b-0a7b-4ffc-b05f-c95a458a1365',
            price: 25000,
            quantity: 2,
            orderItemToppings: [
              {
                menuItemToppingId: '9f793dd3-aafa-4c05-8530-0d0a3a27d6c9',
                price: 4000,
                quantity: 2,
                state: 'IN_STOCK',
                id: '3496e80e-8f5c-4cda-86b3-77f9840fb715',
              },
              {
                menuItemToppingId: '9a2373fb-3846-4f4f-889c-63a04b99a114',
                price: 5000,
                quantity: 1,
                state: 'IN_STOCK',
                id: '9f5e307a-690a-4632-aae5-b720500416ac',
              },
            ],
            discount: 0,
            id: '6f207d41-5439-4f65-9352-90328c5deb7f',
            state: 'IN_STOCK',
          },
        ],
      },
    },
    nullable: true,
  })
  data: IOrderData;
}
