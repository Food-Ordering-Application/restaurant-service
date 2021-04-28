import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { OrderItem } from './order-item.dto';

export class AddNewItemToOrderDto {
  @ApiProperty({
    example: {
      menuItemId: '9c7b4cd5-7dc7-48c7-8cc9-661b2e026cda',
      price: 20000,
      quantity: 3,
      orderItemToppings: [
        {
          menuItemToppingId: '6d93fafd-6cc8-423c-8147-35e011cd8414',
          quantity: 1,
          price: 5000,
        },
        {
          menuItemToppingId: '20228240-d7cd-435a-a8c0-e6b999555a4d',
          quantity: 1,
          price: 9000,
        },
      ],
    },
    required: true,
  })
  @ValidateNested()
  sendItem: OrderItem;
}
