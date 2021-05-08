import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Menu, ToppingGroup } from '../../menu/entities/index';

interface Context {
  menuId: string;
}

define(ToppingGroup, (faker: typeof Faker, context: Context) => {
  const { menuId } = context;
  const menu = new Menu();
  menu.id = menuId;

  const id = faker.random.uuid();
  const name = faker.name.findName();
  const toppingGroup = new ToppingGroup();
  toppingGroup.id = id;
  toppingGroup.menu = menu;
  toppingGroup.name = name;
  toppingGroup.index = 1;
  toppingGroup.isActive = true;
  return toppingGroup;
});
