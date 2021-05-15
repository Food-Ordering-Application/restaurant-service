import { IIdNameAndPriceData } from './index';

export interface IMenuItemData {
  menuItem: {
    price: number;
    name: string;
  };
  menuItemToppings: IIdNameAndPriceData[];
}
