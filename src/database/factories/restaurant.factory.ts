import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Restaurant } from '../../restaurant/entities/index';
import { Area } from '../../restaurant/enums/index';
import * as _ from 'lodash';

interface Context {
  restaurantId?: string;
}

define(Restaurant, (faker: typeof Faker, context: Context) => {
  const { restaurantId } = context;
  const latitude = faker.address.latitude();
  const longtitude = faker.address.longitude();
  const restaurant = new Restaurant();
  restaurant.id = faker.random.uuid();
  restaurant.owner = faker.random.uuid();
  restaurant.name = faker.name.findName();
  restaurant.phone = faker.phone.phoneNumber('0#########');
  restaurant.coverImageUrl = faker.image.imageUrl();
  restaurant.verifiedImageUrl = faker.image.imageUrl();
  restaurant.videoUrl = 'https://www.youtube.com/watch?v=PrJtiLE42PM&t=1s';
  restaurant.numRate = faker.random.number({ max: 999 });
  restaurant.rating = faker.random.number({ min: 0, max: 5 });
  restaurant.address = faker.address.streetAddress();
  restaurant.city = faker.address.city();
  restaurant.geom = {
    type: 'Point',
    coordinates: [parseFloat(longtitude), parseFloat(latitude)],
  };
  restaurant.area = _.sample(Object.values(Area)) as Area;
  restaurant.isActive = true;
  restaurant.isVerified = true;
  return restaurant;
});
