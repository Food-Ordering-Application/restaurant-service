import { ApiProperty } from '@nestjs/swagger';
import { IOrderData } from '../interfaces';

export class IncreaseOrderItemQuantityResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Increase orderItem quantity successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      order: {
        customerId: '93ce7dbb-2911-4bf8-9a66-9377413d6a2c',
        restaurantId: '361112ea-0561-4c2a-aaca-28497cebbe17',
        paymentType: 'COD',
        status: 'DRAFT',
        orderItems: [
          {
            menuItemId: 'ec2063e8-d599-4ba1-9a01-d0158178091d',
            price: 10000,
            quantity: 2,
            orderItemToppings: [
              {
                menuItemToppingId: '2c36512f-0c4d-486b-b582-3c0525dd07cb',
                price: 7000,
                quantity: 1,
                state: 'IN_STOCK',
                id: '86ba8733-6ee8-4036-ade5-063ddaa235a0',
              },
              {
                menuItemToppingId: '48713b6d-5605-4876-958c-2133530c44ca',
                price: 3000,
                quantity: 1,
                state: 'IN_STOCK',
                id: 'f58e653e-9816-43c3-9b23-57df3b8abf76',
              },
            ],
            discount: 0,
            id: '2e1f07bf-7abf-4a04-bfb5-e24fd3f38e8e',
            state: 'IN_STOCK',
          },
        ],
        serviceFee: 2000,
        shippingFee: 15000,
        subTotal: 30000,
        grandTotal: 47000,
        driverId: null,
        itemDiscount: null,
        discount: null,
        deliveredAt: null,
        id: '9ed605eb-331c-4f10-86c3-4dc7cec10f8b',
        createdAt: '2021-05-02T06:12:33.878Z',
        updatedAt: '2021-05-02T06:12:33.878Z',
      },
    },
    nullable: true,
  })
  data: IOrderData;
}
