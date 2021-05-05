import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Category, Restaurant } from '../../restaurant/entities/index';

interface Context {
  restaurants: Restaurant[];
  type: string;
}

define(Category, (faker: typeof Faker, context: Context) => {
  const { restaurants, type } = context;
  const category = new Category();
  category.id = faker.random.uuid();
  category.type = type;
  category.restaurants = restaurants;
  return category;
});
