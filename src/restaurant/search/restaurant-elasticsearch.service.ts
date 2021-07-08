import {
  Fields,
  integer,
  QueryContainer,
  Sort,
} from '@elastic/elasticsearch/api/types';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { DateTimeHelper } from 'src/restaurant/helpers/datetime.helper';
import { RestaurantSearchDto, RestaurantSearchResultDto } from '../dto/';
import { getAnalysis, getMappings } from './restaurant-elasticsearch.config';
import { getSearchBody } from './restaurant-elasticsearch.helper';
import {
  RestaurantRelevantQueryParams,
  SearchDto,
  SortMode,
} from './restaurant-elasticsearch.type';

const INDEX = 'restaurants';

@Injectable()
export class RestaurantElasticsearchService {
  constructor(private readonly client: ElasticsearchService) {}

  async indexRestaurant(id: string, restaurantSearch: RestaurantSearchDto) {
    return this.client.index<RestaurantSearchDto, any>({
      id: id,
      index: INDEX,
      body: restaurantSearch,
    });
  }

  async updateRestaurant(id: string, restaurantSearch: RestaurantSearchDto) {
    const result = await this.client.search({
      index: INDEX,
      body: {
        query: {
          term: {
            id: id,
          },
        },
      },
      filter_path: ['hits.hits._id'],
    });
    const { body } = result;
    const { hits: { hits = [] } = {} } = body;
    const docId: string = hits[0]?._id;
    if (!docId) {
      throw new Error('not found');
    }

    return this.client.update<RestaurantSearchDto, any>({
      id: docId,
      index: INDEX,
      body: {
        doc: restaurantSearch,
      },
    });
  }

  async bulkIndexRestaurant(restaurantSearch: RestaurantSearchDto[]) {
    const body: any[] = restaurantSearch
      .map((res) => [{ index: { _index: INDEX } }, res])
      .reduce((flatted, current) => [...flatted, ...current], []);

    // console.log({ body, test });
    return this.client.bulk({
      body: body,
    });
  }

  async searchRestaurant(
    mode: SortMode = 'RELEVANCE',
    {
      cityId,
      location,
      distance,
      areaIds = [],
      categoryIds = [],
      isFilterOpenRestaurant = false,
      query = '',
      offset = 0,
      limit = 10,
    }: SearchDto,
  ) {
    const currentDateEncode = DateTimeHelper.encodeDate();
    const relevantOptions: RestaurantRelevantQueryParams = {
      location,
      scaleDistance: 3,
      offsetDistance: 2,
      maxRating: 5,
      scaleRating: 1.5,
    };
    const searchBody: {
      _source: Fields;
      query: QueryContainer;
      sort: Sort;
      from: integer;
      size: integer;
    } = getSearchBody(mode, {
      query,
      location,
      currentDateEncode,
      filter: {
        isFilterOpenRestaurant,
        distance,
        currentDateEncode,
        location,
        categoryIds,
        areaIds,
        cityId,
      },
      offset: offset,
      limit: limit,
      relevantOptions: mode == 'RELEVANCE' ? relevantOptions : null,
    });
    // console.dir(
    //   { query: searchBody.query, sort: searchBody.sort },
    //   { depth: null },
    // );
    const request = this.client.search<RestaurantSearchResultDto>({
      index: INDEX,
      body: searchBody,
      filter_path: [
        'took',
        'timed_out',
        'hits.hits._source',
        'hits.hits.inner_hits.*.hits.hits._source',
      ],
    });

    const { body } = await request;
    console.log({ body });
    const { took, timed_out, hits: { hits = [] } = {} } = body;
    return hits.map((item) => {
      const restaurant = {
        ...item._source,
        menuItems:
          item.inner_hits?.menuItems?.hits?.hits?.map(
            (inner) => inner._source,
          ) || [],
      };
      item._source;
      return restaurant;
    });
  }

  // create index with analyzers and mappings
  async createIndex() {
    this.client.indices.create({
      index: INDEX,
      body: {
        settings: {
          analysis: getAnalysis(),
        },
        mappings: {
          properties: getMappings(),
        },
      },
    });
  }

  async deleteIndex() {
    return this.client.indices.delete({ index: INDEX });
  }

  async resetIndex() {
    const isExist = await this.client.indices.exists({ index: INDEX });
    if (isExist) {
      console.log('delete index');
      await this.deleteIndex();
    }
    console.log('create index');
    return this.createIndex();
  }
}
