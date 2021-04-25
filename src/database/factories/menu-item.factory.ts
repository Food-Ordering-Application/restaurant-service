import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Menu, MenuGroup, MenuItem } from '../../menu/entities/index';

interface Context {
  menu: Menu;
  menuGroup: MenuGroup;
}

define(MenuItem, (faker: typeof Faker, context: Context) => {
  const { menu, menuGroup } = context;
  const menuItem = new MenuItem();
  menuItem.id = faker.random.uuid();
  menuItem.menu = menu;
  menuItem.menuGroup = menuGroup;
  menuItem.name = faker.name.findName();
  menuItem.description = faker.lorem.sentence();
  menuItem.price = faker.random.number({ min: 5000, max: 20000 });
  menuItem.imageUrl = faker.image.imageUrl();
  menuItem.index = 1;
  menuItem.isActive = true;
  return menuItem;
});
