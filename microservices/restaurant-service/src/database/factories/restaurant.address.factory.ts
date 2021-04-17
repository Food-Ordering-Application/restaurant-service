import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Restaurant, RestaurantAddress } from '../../restaurant/entities/index';

interface Context {
  restaurantId: number;
}

define(RestaurantAddress, (faker: typeof Faker, context: Context) => {
  faker.locale = 'vi';
  const { restaurantId } = context;
  const id = faker.random.uuid();
  const address = faker.address.streetAddress();
  const latitude = faker.address.latitude();
  const longtitude = faker.address.longitude();
  const restaurant = new Restaurant();
  restaurant.id = restaurantId.toString();

  const restaurantAddress = new RestaurantAddress();
  restaurantAddress.id = id;
  restaurantAddress.address = address;
  restaurantAddress.latitude = latitude;
  restaurantAddress.longtitude = longtitude;
  restaurantAddress.restaurant = restaurant;

  return restaurantAddress;
});
