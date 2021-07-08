import {
  GeoDistanceQuery,
  QueryContainer,
  SortContainerKeys,
  SortOrder,
} from '@elastic/elasticsearch/api/types';
import {
  GeoPoint,
  RestaurantFilterParams,
  RestaurantRelevantQueryParams,
  RestaurantRelevantShouldQueryParams,
  RestaurantSearchBody,
  RestaurantSearchParams,
  SortMode,
} from './restaurant-elasticsearch.type';

const getMustQuery = (query: string): QueryContainer[] => {
  const containQueryString = query && query.length > 0;
  if (!containQueryString) {
    return [];
  }

  const queryBody = [
    {
      bool: {
        should: [
          {
            match: {
              name: {
                query: query,
                boost: 10,
                minimum_should_match: 1,
              },
            },
          },
          {
            nested: {
              path: 'menuItems',
              query: {
                match: {
                  'menuItems.name': {
                    query: query,
                    boost: 5,
                    minimum_should_match: 1,
                  },
                },
              },
              inner_hits: {
                _source: {
                  includes: [
                    'menuItems.id',
                    'menuItems.name',
                    'menuItems.price',
                    'menuItems.imageUrl',
                  ],
                },
                size: 5,
              },
            },
          },
        ],
        minimum_should_match: 1,
      },
    },
  ];
  return queryBody;
};

const getFilterQuery = ({
  isFilterOpenRestaurant,
  distance,
  location,
  currentDateEncode,
  categoryIds,
  areaIds,
  cityId,
}: RestaurantFilterParams): QueryContainer[] => {
  const queryBody = [
    {
      bool: {
        must: [
          {
            geo_distance: {
              distance: `${distance}km`,
              location: {
                lat: location.latitude,
                lon: location.longitude,
              },
            } as GeoDistanceQuery,
          },
          ...(isFilterOpenRestaurant
            ? [
                {
                  term: {
                    openHours: currentDateEncode,
                  },
                },
              ]
            : []),
          ...(categoryIds.length > 0
            ? [
                {
                  terms: {
                    categoryIds: categoryIds,
                  },
                },
              ]
            : []),
          ...(areaIds.length > 0
            ? [
                {
                  terms: {
                    areaId: areaIds,
                  },
                },
              ]
            : []),
          {
            term: {
              cityId: cityId,
            },
          },
          {
            term: {
              isActive: true,
            },
          },
          {
            term: {
              isBanned: false,
            },
          },
          {
            term: {
              isVerified: true,
            },
          },
        ],
      },
    },
  ];
  return queryBody;
};

const getRatingSort = (): { [property: string]: SortOrder }[] => {
  const sortBody: { [property: string]: SortOrder }[] = [
    {
      rating: 'desc',
      numRate: 'desc',
    },
  ];

  return sortBody;
};

const getRelevanceShouldQuery = ({
  query,
  currentDateEncode,
}: RestaurantRelevantShouldQueryParams): QueryContainer[] => {
  const containQueryString = query && query.length > 0;
  const queryBody = [
    ...(containQueryString
      ? [
          {
            match_phrase: {
              name: {
                query: query,
                boost: 500,
              },
            },
          },
          {
            nested: {
              path: 'menuItems',
              query: {
                match_phrase: {
                  'menuItems.name': {
                    query: query,
                    boost: 500,
                    slop: 1,
                  },
                },
              },
            },
          },
        ]
      : []),
    {
      term: {
        openHours: {
          value: currentDateEncode,
          boost: 2,
        },
      },
    },
  ];
  return queryBody;
};

const getRelevanceQuery = (
  query: QueryContainer,
  {
    location,
    offsetDistance,
    scaleDistance,
    maxRating,
    scaleRating,
  }: RestaurantRelevantQueryParams,
): QueryContainer => {
  const queryBody: QueryContainer = {
    function_score: {
      query: query,
      functions: [
        {
          exp: {
            rating: {
              origin: maxRating,
              scale: scaleRating,
            },
          },
        },
        {
          gauss: {
            location: {
              origin: [location.longitude, location.latitude],
              offset: `${offsetDistance}km`,
              scale: `${scaleDistance}km`,
            },
          },
          weight: 2,
        },
      ],
      boost_mode: 'multiply',
    },
  };
  return queryBody;
};

const getDistanceSort = (location: GeoPoint): SortContainerKeys[] => {
  const sortBody: SortContainerKeys[] = [
    {
      _geo_distance: {
        location: {
          lat: location.latitude,
          lon: location.longitude,
        },
        order: 'asc',
        unit: 'km',
        distance_type: 'plane',
        // TODO:
        // ignore_unmapped: true,
      },
    },
  ];
  return sortBody;
};

export const getSearchBody = (
  mode: SortMode = 'RELEVANCE',
  {
    query,
    currentDateEncode,
    location,
    filter,
    offset = 0,
    limit = 10,
    relevantOptions = null,
  }: RestaurantSearchParams,
): RestaurantSearchBody => {
  const sort =
    mode == 'NEARBY'
      ? getDistanceSort(location)
      : mode == 'RATING'
      ? getRatingSort()
      : null;
  const shouldQuery =
    mode == 'RELEVANCE'
      ? getRelevanceShouldQuery({
          query,
          currentDateEncode,
        })
      : null;
  const defaultQuery: QueryContainer = {
    bool: {
      must: getMustQuery(query),
      ...(shouldQuery != null && {
        should: shouldQuery,
      }),
      filter: getFilterQuery(filter),
    },
  };

  const queryBody: QueryContainer =
    mode == 'RELEVANCE' && relevantOptions
      ? getRelevanceQuery(defaultQuery, relevantOptions)
      : defaultQuery;

  return {
    _source: ['id', 'name'],
    query: queryBody,
    ...(sort && {
      sort: sort,
    }),
    from: offset,
    size: limit,
  };
};
