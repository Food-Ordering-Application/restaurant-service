import { ApiProperty } from '@nestjs/swagger';
import { IOrderData } from '../interfaces';

export class CreateOrderResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({ example: 'Order created successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      order: {
        customerId: '6c94e9b7-aa4f-44c8-bf21-91dd1da2dc2d',
        restaurantId: '50e26c95-383b-4cb2-a97c-1547433c6d3a',
        paymentType: {
          id: 'b2fe299c-2070-4403-a5a6-f9b1b5c10414',
          name: 'COD',
        },
        status: {
          id: '2e527c01-6e76-46c0-9782-d7d92119a854',
          name: 'DRAFT',
        },
        orderItems: [
          {
            menuItemId: '9c7b4cd5-7dc7-48c7-8cc9-661b2e026cda',
            price: 20000,
            quantity: 3,
            orderItemToppings: [
              {
                menuItemToppingId: '6d93fafd-6cc8-423c-8147-35e011cd8414',
                price: 5000,
                quantity: 1,
                state: 'IN_STOCK',
                id: 'e678ea5c-2a1f-4b0f-bd49-50681ae1d379',
              },
              {
                menuItemToppingId: '20228240-d7cd-435a-a8c0-e6b999555a4d',
                price: 9000,
                quantity: 1,
                state: 'IN_STOCK',
                id: '065bc54b-8b50-41e6-bd6f-0697de123138',
              },
            ],
            discount: 0,
            id: '80bd3bbe-9019-406a-a17f-d78d01447ec4',
            state: 'IN_STOCK',
          },
        ],
        serviceFee: 2000,
        shippingFee: 15000,
        subTotal: 34000,
        grandTotal: 51000,
        driverId: null,
        itemDiscount: null,
        discount: null,
        deliveredAt: null,
        id: 'e2940434-6283-42ff-9cb9-518ab9b42562',
        createdAt: '2021-04-27T12:14:16.800Z',
        updatedAt: '2021-04-27T12:14:16.800Z',
      },
    },
    nullable: true,
  })
  data: IOrderData;
}
