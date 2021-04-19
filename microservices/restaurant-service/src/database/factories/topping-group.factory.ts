import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { ToppingGroup } from '../../menu/entities/index';
import { Restaurant } from '../../restaurant/entities/index';

interface Context {
  restaurantId: string;
}

define(ToppingGroup, (faker: typeof Faker, context: Context) => {
  faker.locale = 'vi';
  const { restaurantId } = context;
  const restaurant = new Restaurant();
  restaurant.id = restaurantId;
  const id = faker.random.uuid();
  const name = faker.name.findName();
  const toppingGroup = new ToppingGroup();
  toppingGroup.id = id;
  toppingGroup.restaurant = restaurant;
  toppingGroup.name = name;
  toppingGroup.index = 1;
  toppingGroup.isActive = true;
  return toppingGroup;
});
