export class RestaurantSearchResultDto {
  took: number;
  timed_out: boolean;
  hits: {
    hits: Array<{
      _source: {
        id: string;
        name: string;
      };
      inner_hits: {
        menuItems: {
          hits: {
            hits: Array<{
              _source: {
                id: string;
                name: string;
                price: number;
                imageUrl: string;
              };
            }>;
          };
        };
      };
    }>;
  };
}
