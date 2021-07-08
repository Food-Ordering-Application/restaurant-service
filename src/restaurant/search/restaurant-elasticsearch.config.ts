import { Property } from '@elastic/elasticsearch/api/types';
export const getMappings = (): Record<string, Property> => {
  return {
    id: {
      type: 'keyword',
    },
    areaId: {
      type: 'integer',
    },
    cityId: {
      type: 'integer',
    },
    categoryIds: {
      type: 'integer',
    },
    isActive: {
      type: 'boolean',
    },
    isVerified: {
      type: 'boolean',
    },
    isBanned: {
      type: 'boolean',
    },
    name: {
      type: 'text',
      analyzer: 'vietnamese_filtered',
    },
    menuItems: {
      type: 'nested',
      properties: {
        id: {
          type: 'keyword',
        },
        name: {
          type: 'text',
          analyzer: 'vietnamese_filtered',
        },
        price: {
          type: 'integer',
        },
        imageUrl: {
          type: 'keyword',
        },
      },
    },
    location: {
      type: 'geo_point',
    },
    openHours: {
      type: 'integer_range',
    },
    numRate: {
      type: 'integer',
    },
    rating: {
      type: 'float',
    },
  };
};

export const getAnalysis = () => {
  return {
    analyzer: {
      vietnamese_filtered: {
        type: 'custom',
        tokenizer: 'standard',
        filter: ['lowercase', 'asciifolding'],
      },
    },
  };
};
