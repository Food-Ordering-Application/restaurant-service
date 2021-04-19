import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Menu, MenuGroup } from '../../menu/entities/index';

interface Context {
  menuId: string;
}

define(MenuGroup, (faker: typeof Faker, context: Context) => {
  faker.locale = 'vi';
  const { menuId } = context;
  const menu = new Menu();
  menu.id = menuId;
  const id = faker.random.uuid();
  const menuGroup = new MenuGroup();
  menuGroup.id = id;
  menuGroup.menu = menu;
  menuGroup.index = 1;
  menuGroup.name = faker.name.findName();
  return menuGroup;
});
