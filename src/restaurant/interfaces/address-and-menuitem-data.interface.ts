import { IIdNameAndPriceData } from './index';

export interface IAddressAndMenuItemData {
  address: string;
  geom: { type: string; coordinates: number[] };
  menuItem: {
    price: number;
    name: string;
  };
  menuItemToppings: IIdNameAndPriceData[];
}
