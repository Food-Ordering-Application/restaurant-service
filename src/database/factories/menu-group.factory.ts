import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { MenuGroup, MenuItem } from '../../menu/entities/index';

interface Context {
  menuItems: MenuItem[];
}

define(MenuGroup, (faker: typeof Faker, context: Context) => {
  const { menuItems } = context;
  const id = faker.random.uuid();
  const menuGroup = new MenuGroup();
  menuGroup.id = id;
  menuGroup.menuItems = menuItems;
  menuGroup.index = 1;
  menuGroup.name = faker.name.findName();
  return menuGroup;
});
