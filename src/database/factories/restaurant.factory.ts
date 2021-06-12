import { Area, City } from '../../geo/entities';
import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Category, Restaurant } from '../../restaurant/entities/index';
import { CategoryType } from '../../restaurant/enums/index';
import * as _ from 'lodash';
import { Position } from '../../geo/types/position';

interface Context {
  restaurantId?: string;
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
  const isActive = true;
  const isVerified = true;

  const latitudes = [10.7058661, 10.7566764, 10.7380495];
  const longitudes = [106.7049702, 106.6626456, 106.6788235];

  const random = Math.floor(Math.random() * latitudes.length);
  const geom = Position.PositionToGeometry({
    latitude: latitudes[random],
    longitude: longitudes[random],
  });

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
  restaurant.geom = geom;
  restaurant.isActive = isActive;
  restaurant.isVerified = isVerified;

  function randomInteger(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getCategoryId = () => randomInteger(0, 12);
  const getCityId = () => 5;
  const getAreaId = () => randomInteger(136, 154);

  const city = new City();
  city.id = getCityId();
  restaurant.city = city;

  const area = new Area();
  area.id = getAreaId();
  restaurant.area = area;

  // const newCategory = new Category();
  // newCategory.id = getCategoryId();
  // restaurant.categories = [newCategory];

  return restaurant;
});
