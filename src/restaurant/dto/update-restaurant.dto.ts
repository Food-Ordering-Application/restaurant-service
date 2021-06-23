export class UpdateRestaurantDto {
  merchantId: string;
  restaurantId: string;
  data: UpdatedRestaurantDataDto;
}

export class UpdatedRestaurantDataDto {
  name: string;
  phone: string;
  coverImageUrl: string;
  verifiedImageUrl: string;
  videoUrl: string;
  address: string;
  geo: {
    latitude: number;
    longitude: number;
  };
  isActive: boolean;
}
