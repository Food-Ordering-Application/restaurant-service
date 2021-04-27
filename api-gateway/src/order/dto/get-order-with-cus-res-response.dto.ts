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
        id: 'ca8ea1c1-1654-4b01-ae0f-f864bcfbdd53',
        customerId: '35ac037d-9285-454a-9969-af562e90176c',
        driverId: null,
        restaurantId: '4416b387-268c-4d8e-b116-5f6ad7344e92',
        subTotal: 83000,
        itemDiscount: null,
        shippingFee: 15000,
        serviceFee: 2000,
        discount: null,
        grandTotal: 100000,
        createdAt: '2021-04-27T14:11:04.463Z',
        updatedAt: '2021-04-27T14:11:04.463Z',
        deliveredAt: null,
      },
    },
    nullable: true,
  })
  data: IOrderData;
}
