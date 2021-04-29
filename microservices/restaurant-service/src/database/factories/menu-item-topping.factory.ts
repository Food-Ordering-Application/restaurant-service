import { define } from 'typeorm-seeding';
import Faker from 'faker';
import {
  MenuItem,
  MenuItemTopping,
  ToppingItem,
} from '../../menu/entities/index';

interface Context {
  menuItem: MenuItem;
  toppingItem: ToppingItem;
  menuItemToppingId?: string;
}

define(MenuItemTopping, (faker: typeof Faker, context: Context) => {
  const { menuItem, toppingItem, menuItemToppingId } = context;
  const menuItemTopping = new MenuItemTopping();
  if (!menuItemToppingId) {
    menuItemTopping.id = faker.random.uuid();
  } else {
    menuItemTopping.id = menuItemToppingId;
  }
  menuItemTopping.menuItem = menuItem;
  menuItemTopping.toppingItem = toppingItem;
  menuItemTopping.customPrice = faker.random.number({ min: 5000, max: 20000 });
  return menuItemTopping;
});
