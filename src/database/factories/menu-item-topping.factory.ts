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
}

define(MenuItemTopping, (faker: typeof Faker, context: Context) => {
  faker.locale = 'vi';
  const { menuItem, toppingItem } = context;
  const menuItemTopping = new MenuItemTopping();
  menuItemTopping.id = faker.random.uuid();
  menuItemTopping.menuItem = menuItem;
  menuItemTopping.toppingItem = toppingItem;
  menuItemTopping.customPrice = faker.random.number({ min: 5000, max: 20000 });
  return menuItemTopping;
});
