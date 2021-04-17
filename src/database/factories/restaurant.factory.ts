import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Restaurant } from '../../restaurant/entities/index';

define(Restaurant, (faker: typeof Faker) => {
  faker.locale = 'vi';
  const id = faker.random.uuid();
  const owner = faker.random.uuid();
  const name = faker.name.findName();
  const imageUrl = faker.image.imageUrl();
  const videoUrl = 'https://www.youtube.com/watch?v=PrJtiLE42PM&t=1s';
  const numRate = faker.random.number({ max: 999 });
  const rating = faker.random.number({ min: 0, max: 5 });
  const area = faker.address.city();
  const isActive = true;

  const restaurant = new Restaurant();
  restaurant.id = id;
  restaurant.owner = owner;
  restaurant.name = name;
  restaurant.imageUrl = imageUrl;
  restaurant.videoUrl = videoUrl;
  restaurant.numRate = numRate;
  restaurant.rating = rating;
  restaurant.area = area;
  restaurant.isActive = isActive;
  return restaurant;
});
