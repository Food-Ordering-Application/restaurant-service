import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Menu, MenuGroup, MenuItem } from '../../menu/entities/index';
import { Restaurant } from '../../restaurant/entities/index';

interface Context {
  menuItems: MenuItem[];
  menuGroups: MenuGroup[];
}

define(Menu, (faker: typeof Faker, context: Context) => {
  const { menuItems, menuGroups } = context;
  const id = faker.random.uuid();
  const name = faker.name.findName();
  const menu = new Menu();
  menu.menuItems = menuItems;
  menu.id = id;
  // menu.restaurant = restaurant;
  menu.menuGroups = menuGroups;
  menu.name = name;
  menu.index = 1;
  return menu;
});
