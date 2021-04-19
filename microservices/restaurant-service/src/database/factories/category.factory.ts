import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Category, Restaurant } from '../../restaurant/entities/index';

interface Context {
  restaurants: Restaurant[];
}

define(Category, (faker: typeof Faker, context: Context) => {
  faker.locale = 'vi';
  const { restaurants } = context;
  const category = new Category();
  category.id = faker.random.uuid();
  category.restaurants = restaurants;
  return category;
});
