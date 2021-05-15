import { OpenHour } from './../entities/';
import { DaysOfWeek } from '../enums';

export class OpenHourDto {
  id: string;
  day: string;
  fromHour: number;
  fromMinute: number;
  toHour: number;
  toMinute: number;
  static EntityToDto(openHour: OpenHour): OpenHourDto {
    const { id, day, fromHour, fromMinute, toHour, toMinute } = openHour;
    return {
      id,
      day,
      fromHour,
      fromMinute,
      toHour,
      toMinute,
    };
  }
}
