import { CategoryDto } from '../dto';
import { RestaurantFilterType, RestaurantSortType } from '../enums';

export interface IGetMetaDataResponse {
  status: number;
  message: string;
  data: {
    deliveryService: {
      // thoi gian cho phep giao hang
      serviceStartTime: string;
      serviceEndTime: string;
      // thoi gian giao hang toi da
      maxDeliverTime: number;
      minDeliverTime: number;
      averageTimePer1km: number;
      // thoi gian giao hang du kien =
      // max(thoi gian chuan bi, thoi gian shipper toi cua hang) +
      // thoi gian di chuyen cua shipper (average_time_per_1km * distance)
      deliverEstimateTime: {
        merchantTime: number; // thoi gian chuan bi cua nha hang
        stepTime: number;
      };
      closeTimeWarning: 1800; // 30' truoc gio dong
      callCenter: string;
      distanceLimit: 10000; // gioi han dat 10km
    };
    categories: CategoryDto[];
    restaurantFilterType: {
      name: 'Đang mở' | 'Ưu đãi';
      id: RestaurantFilterType;
    }[];
    restaurantSortType: {
      name: 'Gần đây' | 'Đánh giá';
      id: RestaurantSortType;
    }[];
  };
}
