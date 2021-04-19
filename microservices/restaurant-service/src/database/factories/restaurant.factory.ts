import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Restaurant } from '../../restaurant/entities/index';

define(Restaurant, (faker: typeof Faker) => {
  faker.locale = 'vi';
  const id = faker.random.uuid();
  const owner = faker.random.uuid();
  const name = faker.name.findName();
  const phoneNumber = faker.phone.phoneNumber('0#########');
  const coverImageUrl = faker.image.imageUrl();
  const verifiedImageUrl = faker.image.imageUrl();
  const videoUrl = 'https://www.youtube.com/watch?v=PrJtiLE42PM&t=1s';
  const numRate = faker.random.number({ max: 999 });
  const rating = faker.random.number({ min: 0, max: 5 });
  const address = faker.address.streetAddress();
  const city = faker.address.city();
  const area = faker.address.city();
  const isActive = true;
  const isVerified = true;
  const latitude = faker.address.latitude();
  const longtitude = faker.address.longitude();
  const geom = {
    type: 'Point',
    coordinates: [parseFloat(longtitude), parseFloat(latitude)],
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
  return restaurant;
});
