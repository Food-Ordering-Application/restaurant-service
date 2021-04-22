import { ICategory } from './index';

export interface IRestaurant {
  id: string;
  name?: string;
  phone?: string;
  owner?: string;
  coverImageUrl?: string;
  videoUrl?: string;
  numRate?: number;
  rating?: number;
  address?: string;
  area?: string;
  isActive?: boolean;
  categories?: ICategory[];
}
