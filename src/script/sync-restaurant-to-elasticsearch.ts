import { Client } from '@elastic/elasticsearch';
import { ConfigModule } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import 'reflect-metadata';
import { RestaurantElasticsearchService } from 'src/restaurant/search/restaurant-elasticsearch.service';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { RestaurantSearchDto } from '../restaurant/dto/restaurant-search.dto';
import { Restaurant } from '../restaurant/entities';

ConfigModule.forRoot();
// load env
const RestaurantElasticSearch = new RestaurantElasticsearchService(
  new Client({
    ...(!!process.env.ELASTICSEARCH_CLOUD_ID
      ? {
          cloud: {
            id: process.env.ELASTICSEARCH_CLOUD_ID,
          },
        }
      : { node: process.env.ELASTICSEARCH_NODE }),
    auth: {
      username: process.env.ELASTICSEARCH_USERNAME,
      password: process.env.ELASTICSEARCH_PASSWORD,
    },
  }),
);

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

// console.log({ config });

const writeToFile = async (filename: string, data: any) => {
  const _path = `../../src/script/${filename}`;
  const absolutePath = path.resolve(__dirname, _path);
  fs.writeFileSync(absolutePath, JSON.stringify(data));
  // console.log({ filename, data });
};

const testSearch = async () => {
  console.log('test search');
  const areaIds = [143, 144];
  const categoryIds = [1, 2, 12];
  const result = await RestaurantElasticSearch.searchRestaurant('RELEVANCE', {
    query: 'Mi cay',
    areaIds,
    categoryIds,
    isFilterOpenRestaurant: true,
    cityId: 5,
    location: {
      latitude: 10.754786798105071,
      longitude: 106.66122381058468,
    },
    distance: 10,
  });
  writeToFile('results.json', result);
};

const resetIndex = async () => {
  await RestaurantElasticSearch.resetIndex();
  // delete index
  // await RestaurantElasticSearch.deleteIndex();

  // create index
  // await RestaurantElasticSearch.createIndex();

  // dump data
  console.log('dump data');
};

const fetchRestaurantFromDatabase = async (
  connection: Connection,
  position: number,
  batchSize: number,
) => {
  console.log('---- Connected to database. Start to fetch restaurant ----');
  const queryBuilder = connection
    .getRepository(Restaurant)
    .createQueryBuilder('res');

  const getRestaurant = queryBuilder
    .leftJoinAndSelect('res.menu', 'menu')
    .leftJoinAndSelect('res.categories', 'categories')
    .leftJoinAndSelect('res.openHours', 'openHours')
    .leftJoinAndSelect('menu.menuItems', 'menuItems')
    .skip(position)
    .take(batchSize);

  const restaurants = await getRestaurant.getMany();

  const fileName = 'restaurants.json';
  console.log(
    `---- Fetch restaurant done. Convert to index mapping and write to ./${fileName} ----`,
  );
  const data = restaurants.map(RestaurantSearchDto.fromEntity);
  writeToFile('restaurants.json', data);

  console.log(
    `---- Save restaurant index mapping doc to ./${fileName} successfully. Start to dump to elasticsearch ----`,
  );
  return data;
};

const countRestaurant = async (connection: Connection): Promise<number> => {
  return connection
    .getRepository(Restaurant)
    .createQueryBuilder('res')
    .getCount();
};

const syncBatchRestaurant = async (
  connection: Connection,
  position: number,
  batchSize: number,
) => {
  console.log(`position: ${position}, batch: ${batchSize} start`);
  const data = await fetchRestaurantFromDatabase(
    connection,
    position,
    batchSize,
  );
  console.log(`position: ${position}, batch: ${batchSize} fetched`);
  await RestaurantElasticSearch.bulkIndexRestaurant(data);
  console.log(`position: ${position}, batch: ${batchSize} success`);
};

const syncDBtoElasticsearch = async (connection: Connection) => {
  console.log('count restaurants');
  const total = await countRestaurant(connection);
  // reset index
  console.log('reset index');
  await resetIndex();

  let position = 0;
  const batchSize = 5;
  const parallel = 4;
  // reset index
  console.log('start');
  while (position < total) {
    const results: Promise<any>[] = [];
    for (let i = 0; i < parallel; i++) {
      const promise = syncBatchRestaurant(connection, position, batchSize);
      results.push(promise);
      position += batchSize;
      if (position >= total) {
        break;
      }
    }

    await Promise.all(results);
  }
};

const job = async () => {
  const connection = await createConnection(config);

  await syncDBtoElasticsearch(connection);
  // test search
  await testSearch();

  console.log('done');
};

try {
  job();
} catch (error) {
  console.log(error);
}
