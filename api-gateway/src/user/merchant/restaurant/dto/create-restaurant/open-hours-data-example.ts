import { DaysOfWeek } from 'src/shared/enum/day.enum';
import { OpenHourDto } from './open-hours-data.dto';
export const OpenHoursDataExample: OpenHourDto[] = [
  {
    fromHour: 8,
    fromMinute: 0,
    toHour: 22,
    toMinute: 0,
    day: DaysOfWeek.Monday
  },
  {
    fromHour: 8,
    fromMinute: 0,
    toHour: 22,
    toMinute: 0,
    day: DaysOfWeek.TuesDay
  },
  {
    fromHour: 8,
    fromMinute: 0,
    toHour: 22,
    toMinute: 0,
    day: DaysOfWeek.Wednesday
  },
  {
    fromHour: 8,
    fromMinute: 0,
    toHour: 22,
    toMinute: 0,
    day: DaysOfWeek.Thursday
  }, {
    fromHour: 8,
    fromMinute: 0,
    toHour: 22,
    toMinute: 0,
    day: DaysOfWeek.Friday
  }
  , {
    fromHour: 8,
    fromMinute: 0,
    toHour: 22,
    toMinute: 0,
    day: DaysOfWeek.Saturday
  },
  {
    fromHour: 8,
    fromMinute: 0,
    toHour: 22,
    toMinute: 0,
    day: DaysOfWeek.Sunday
  }
];