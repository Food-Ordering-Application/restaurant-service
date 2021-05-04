import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { OpenHour, Restaurant } from '../../restaurant/entities/index';
import { DaysOfWeek } from '../../restaurant/enums/day.enum';
import * as _ from 'lodash';

interface Context {
  restaurantId: number;
}

define(OpenHour, (faker: typeof Faker, context: Context) => {
  const openHour = new OpenHour();
  openHour.id = faker.random.uuid();
  openHour.day = _.sample(Object.values(DaysOfWeek)) as DaysOfWeek;
  openHour.fromHour = 8;
  openHour.toHour = 19;
  openHour.fromMinute = 30;
  openHour.toMinute = 45;
  // openHour.restaurant = restaurant;

  return openHour;
});
