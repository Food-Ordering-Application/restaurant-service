import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { OpenHour, Restaurant } from '../../restaurant/entities/index';
import { DaysOfWeek } from '../../restaurant/enums/day.enum';
import * as _ from 'lodash';

interface Context {
  restaurantId: number;
}

define(OpenHour, (faker: typeof Faker, context: Context) => {
  faker.locale = 'vi';
  const { restaurantId } = context;
  const id = faker.random.uuid();
  const day = _.sample(Object.values(DaysOfWeek)) as DaysOfWeek;
  const fromHour = 8;
  const toHour = 19;
  const fromMinute = 30;
  const toMinute = 45;
  const restaurant = new Restaurant();
  restaurant.id = restaurantId.toString();

  const openHour = new OpenHour();
  openHour.id = id;
  openHour.day = day;
  openHour.fromHour = fromHour;
  openHour.toHour = toHour;
  openHour.fromMinute = fromMinute;
  openHour.toMinute = toMinute;
  openHour.restaurant = restaurant;

  return openHour;
});
