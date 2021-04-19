import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Menu } from '../../menu/entities/index';
import { Restaurant } from '../../restaurant/entities/index';

interface Context {
  restaurantId: string;
}

define(Menu, (faker: typeof Faker, context: Context) => {
  faker.locale = 'vi';
  const { restaurantId } = context;
  const restaurant = new Restaurant();
  restaurant.id = restaurantId;
  const id = faker.random.uuid();
  const name = faker.name.findName();
  const menu = new Menu();
  menu.id = id;
  menu.restaurant = restaurant;
  menu.name = name;
  menu.index = 1;
  return menu;
});
