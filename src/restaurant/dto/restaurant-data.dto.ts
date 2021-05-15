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
  city: string;
  area: string;
  openHours: {
    fromHour: number;
    fromMinute: number;
    toHour: number;
    toMinute: number;
    day: DaysOfWeek;
  }[];
  categories: CategoryType[];
}
