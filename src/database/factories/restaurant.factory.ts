import { Area, City } from '../../geo/entities';
import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Category, Restaurant } from '../../restaurant/entities/index';
import { CategoryType } from '../../restaurant/enums/index';
import * as _ from 'lodash';

interface Context {
  restaurantId?: string;
  categories: CategoryType[];
}

define(Restaurant, (faker: typeof Faker, context: Context) => {
  const { restaurantId } = context;
  let id;
  if (!restaurantId) {
    id = faker.random.uuid();
  } else {
    id = restaurantId;
  }
  const owner = faker.random.uuid();
  const name = faker.name.findName();
  const phoneNumber = faker.phone.phoneNumber('0#########');
  const coverImageUrl = faker.image.imageUrl();
  const verifiedImageUrl = faker.image.imageUrl();
  const videoUrl = 'https://www.youtube.com/watch?v=PrJtiLE42PM&t=1s';
  const numRate = faker.random.number({ max: 999 });
  const rating = faker.random.number({ min: 0, max: 5 });
  const address = faker.address.streetAddress();
  const city = new City();
  city.id = 5;
  const area = new Area();
  area.id = faker.random.number({ min: 136, max: 154 });
  const isActive = true;
  const isVerified = true;

  const latitudes = [10.7058661, 10.7566764, 10.7380495];
  const longtitudes = [106.7049702, 106.6626456, 106.6788235];

  const random = Math.floor(Math.random() * latitudes.length);
  const geom = {
    type: 'Point',
    coordinates: [longtitudes[random], latitudes[random]],
  };

  const restaurant = new Restaurant();
  restaurant.id = id;
  restaurant.owner = owner;
  restaurant.name = name;
  restaurant.phone = phoneNumber;
  restaurant.coverImageUrl = coverImageUrl;
  restaurant.verifiedImageUrl = verifiedImageUrl;
  restaurant.videoUrl = videoUrl;
  restaurant.numRate = numRate;
  restaurant.rating = rating;
  restaurant.address = address;
  restaurant.city = city;
  restaurant.geom = geom;
  restaurant.area = area;
  restaurant.isActive = isActive;
  restaurant.isVerified = isVerified;

  const newCategory = new Category();
  newCategory.name = _.sample(Object.values(CategoryType)) as CategoryType;

  restaurant.categories = [newCategory];
  return restaurant;
});
