import { IOrderItemData } from '../interfaces';

export class GetRestaurantAddressInfoAndMenuItemDto {
  restaurantId: string;
  orderItem: IOrderItemData;
}
