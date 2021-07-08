import {
  Fields,
  integer,
  QueryContainer,
  Sort,
} from '@elastic/elasticsearch/api/types';

export type GeoPoint = {
  latitude: number;
  longitude: number;
};

export type RestaurantRelevantShouldQueryParams = {
  currentDateEncode: number;
  query: string;
};

export type RestaurantRelevantQueryParams = {
  location: GeoPoint;
  offsetDistance: number;
  scaleDistance: number;
  maxRating: number;
  scaleRating: number;
};

export type RestaurantFilterParams = {
  isFilterOpenRestaurant: boolean;
  distance: number;
  location: GeoPoint;
  currentDateEncode: number;
  categoryIds: number[];
  areaIds: number[];
  cityId: number;
};

export type RestaurantSearchParams = {
  currentDateEncode: number;
  query: string;
  location: GeoPoint;
  filter: RestaurantFilterParams;
  relevantOptions: RestaurantRelevantQueryParams;
  offset?: number;
  limit?: number;
};

export type RestaurantSearchBody = {
  _source: Fields;
  query: QueryContainer;
  sort: Sort;
  from: integer;
  size: integer;
};

export type SortMode = 'RELEVANCE' | 'RATING' | 'NEARBY';

export type SearchDto = {
  cityId: number;
  location: GeoPoint;
  distance: 10;
  isFilterOpenRestaurant?: boolean;
  categoryIds?: number[];
  areaIds?: number[];
  query?: string;
};
