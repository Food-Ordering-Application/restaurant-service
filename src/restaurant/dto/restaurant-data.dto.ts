import { CategoryType, DaysOfWeek } from '../enums';

export class RestaurantDataDto {
  name: string;
  phone: string;
  address: string;
  coverImageUrl: string;
  verifiedImageUrl: string;
  videoUrl?: string;
  geo: {
    latitude: number;
    longitude: number;
  };
  cityId: number;
  areaId: number;
  openHours: {
    fromHour: number;
    fromMinute: number;
    toHour: number;
    toMinute: number;
    day: DaysOfWeek;
  }[];
  categoryIds: number[];
}
