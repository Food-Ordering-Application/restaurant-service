import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { ToppingGroup, ToppingItem } from '../../menu/entities/index';

interface Context {
  toppingGroup: ToppingGroup;
}

define(ToppingItem, (faker: typeof Faker, context: Context) => {
  faker.locale = 'vi';
  const { toppingGroup } = context;
  const toppingItem = new ToppingItem();
  toppingItem.id = faker.random.uuid();
  toppingItem.group = toppingGroup;
  toppingItem.description = faker.lorem.sentence();
  toppingItem.maxQuantity = 3;
  toppingItem.price = faker.random.number({ min: 30000, max: 100000 });
  toppingItem.index = 1;
  toppingItem.isActive = true;
  return toppingItem;
});
