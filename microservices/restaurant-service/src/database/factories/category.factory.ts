import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Category, Restaurant } from '../../restaurant/entities/index';

interface Context {
  restaurant: Restaurant;
}

define(Category, (faker: typeof Faker, context: Context) => {
  const { restaurant } = context;
  const category = new Category();
  category.id = faker.random.uuid();
  category.restaurant = restaurant;
  return category;
});
