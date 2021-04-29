export interface RestaurantDto {
  id: string;
  name?: string;
  phone?: string;
  owner?: string;
  coverImageUrl?: string;
  videoUrl?: string;
  numRate?: number;
  rating?: number;
  address?: string;
  city?: string;
  area?: string;
  isActive?: boolean;
}
