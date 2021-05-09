import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Menu, ToppingGroup, ToppingItem } from '../../menu/entities/index';

interface Context {
  menu: Menu;
  toppingGroup: ToppingGroup;
  menuId?: string;
}

define(ToppingItem, (faker: typeof Faker, context: Context) => {
  const { menu, toppingGroup, menuId } = context;
  const toppingItem = new ToppingItem();
  toppingItem.id = faker.random.uuid();
  toppingItem.menu = menu;
  toppingItem.toppingGroup = toppingGroup;
  toppingItem.name = faker.name.findName();
  toppingItem.description = faker.lorem.sentence();
  toppingItem.maxQuantity = 3;
  toppingItem.price = faker.random.number({ min: 30000, max: 100000 });
  toppingItem.index = 1;
  toppingItem.isActive = true;
  return toppingItem;
});
