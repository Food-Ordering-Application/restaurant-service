import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { ToppingGroup, ToppingItem } from '../../menu/entities/index';

interface Context {
  toppingItems: ToppingItem[];
}

define(ToppingGroup, (faker: typeof Faker, context: Context) => {
  const { toppingItems } = context;
  const id = faker.random.uuid();
  const name = faker.name.findName();
  const toppingGroup = new ToppingGroup();
  toppingGroup.id = id;
  // toppingGroup.restaurant = restaurant;
  toppingGroup.toppingItems = toppingItems;
  toppingGroup.name = name;
  toppingGroup.index = 1;
  toppingGroup.isActive = true;
  return toppingGroup;
});
