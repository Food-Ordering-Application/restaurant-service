import { Position } from './../../geo/types/position';
import { City, Area } from '../../geo/entities';
import { Restaurant } from '../../restaurant/entities';
import { DeepPartial, MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class changeCityAndArea1622904823967 implements MigrationInterface {
  name = 'changeCityAndArea1622904823967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // drop old cate fks
    await queryRunner.query(
      `ALTER TABLE "restaurant_categories_category" DROP CONSTRAINT "FK_8b3d1cafbd598019275ac16a5a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_categories_category" DROP CONSTRAINT "FK_ae4765a977eaa05fe587b1c2591"`,
    );

    // drop old indexes
    await queryRunner.query(`DROP INDEX "IDX_8b3d1cafbd598019275ac16a5a"`);
    await queryRunner.query(`DROP INDEX "IDX_ae4765a977eaa05fe587b1c259"`);

    // create new indexes
    await queryRunner.query(
      `CREATE INDEX "IDX_c7ba4386a7000d36b4f0c83111" ON "restaurant_categories_category" ("restaurantId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f36d43a9bce12309b895e6e1e4" ON "restaurant_categories_category" ("categoryId") `,
    );

    // create new cate fks
    await queryRunner.query(
      `ALTER TABLE "restaurant_categories_category" ADD CONSTRAINT "FK_c7ba4386a7000d36b4f0c83111f" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_categories_category" ADD CONSTRAINT "FK_f36d43a9bce12309b895e6e1e4b" FOREIGN KEY ("categoryId") REFERENCES "category_v2"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    // create city, area tables
    await queryRunner.query(
      `CREATE TABLE "city" ("id" int4 NOT NULL, "name" character varying NOT NULL, "geometry" geometry(Point,4326) NOT NULL, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "area" ("id" int4 NOT NULL, "name" character varying NOT NULL, "cityId" integer, CONSTRAINT "PK_39d5e4de490139d6535d75f42ff" PRIMARY KEY ("id"))`,
    );

    // add city, area columns to restaurant
    await queryRunner.query(`ALTER TABLE "restaurant" ADD "cityId" integer`);
    await queryRunner.query(`ALTER TABLE "restaurant" ADD "areaId" integer`);

    // add fk to city
    await queryRunner.query(
      `ALTER TABLE "area" ADD CONSTRAINT "FK_f335d449f3c45e450239b293b06" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    // add fk to restaurant
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_2dee218ec5352ede6b4d56dcc79" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_18299870e34923dc98d23ef18d4" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    // seed data
    await this.seedData(queryRunner);

    // update area for restaurant
    function randomInteger(min, max): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const getRandomArea = () => {
      /**"136": "Qu???n 1",
        "137": "Qu???n 10",
        "138": "Qu???n 11",
        "139": "Qu???n 12",
        "140": "Qu???n 2",
        "141": "Qu???n 3",
        "142": "Qu???n 4",
        "143": "Qu???n 5",
        "144": "Qu???n 6",
        "145": "Qu???n 7",
        "146": "Qu???n 8",
        "147": "Qu???n 9",
        "148": "Qu???n B??nh T??n",
        "149": "Qu???n B??nh Th???nh",
        "150": "Qu???n G?? V???p",
        "151": "Qu???n Ph?? Nhu???n",
        "152": "Qu???n T??n B??nh",
        "153": "Qu???n T??n Ph??",
        "154": "Qu???n Th??? ?????c"
       */
      const randomAreaId = randomInteger(136, 154);
      return {
        cityId: 5,
        areaId: randomAreaId,
      };
    };

    const restaurants = await queryRunner.manager.find(Restaurant);
    const newRestaurants: Restaurant[] = restaurants.map((restaurant) => {
      const randomArea = getRandomArea();
      const { cityId, areaId } = randomArea;
      return { ...restaurant, areaId, cityId };
    });
    await queryRunner.manager.save(Restaurant, newRestaurants);

    await queryRunner.query(
      `ALTER TABLE "restaurant" ALTER COLUMN "cityId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ALTER COLUMN "areaId" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // drop fk of city, area in restaurant
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_18299870e34923dc98d23ef18d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_2dee218ec5352ede6b4d56dcc79"`,
    );

    // drop fk of city in area
    await queryRunner.query(
      `ALTER TABLE "area" DROP CONSTRAINT "FK_f335d449f3c45e450239b293b06"`,
    );

    // drop city, area columns in restaurant
    await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "areaId"`);
    await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "cityId"`);

    // drop city, area table
    await queryRunner.query(`DROP TABLE "area"`);
    await queryRunner.query(`DROP TABLE "city"`);

    // drop new cate fks
    await queryRunner.query(
      `ALTER TABLE "restaurant_categories_category" DROP CONSTRAINT "FK_f36d43a9bce12309b895e6e1e4b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_categories_category" DROP CONSTRAINT "FK_c7ba4386a7000d36b4f0c83111f"`,
    );

    // drop new indexes
    await queryRunner.query(`DROP INDEX "IDX_f36d43a9bce12309b895e6e1e4"`);
    await queryRunner.query(`DROP INDEX "IDX_c7ba4386a7000d36b4f0c83111"`);

    // add old indexes
    await queryRunner.query(
      `CREATE INDEX "IDX_ae4765a977eaa05fe587b1c259" ON "restaurant_categories_category" ("categoryId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8b3d1cafbd598019275ac16a5a" ON "restaurant_categories_category" ("restaurantId") `,
    );

    // add old cate fks
    await queryRunner.query(
      `ALTER TABLE "restaurant_categories_category" ADD CONSTRAINT "FK_ae4765a977eaa05fe587b1c2591" FOREIGN KEY ("categoryId") REFERENCES "category_v2"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_categories_category" ADD CONSTRAINT "FK_8b3d1cafbd598019275ac16a5a7" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  async seedData(queryRunner: QueryRunner) {
    type CitiesJsonSchema = Record<
      string,
      {
        name: string;
        latitude: number;
        longitude: number;
        districts: Record<string, string>;
      }
    >;

    const seedJsonFileName = 'cities.json';
    const _path = `./${seedJsonFileName}`;
    const absolutePath = path.resolve(__dirname, _path);
    const response: CitiesJsonSchema = JSON.parse(
      fs.readFileSync(absolutePath, 'utf8'),
    );

    const createCity = (data: DeepPartial<City>): City =>
      queryRunner.manager.create(City, data);
    const createArea = (data: DeepPartial<Area>): Area =>
      queryRunner.manager.create(Area, data);

    const cities: City[] = Object.entries(response).map(
      ([id, { districts, name, latitude, longitude }]) => {
        const newDistricts: Area[] = Object.entries(
          districts,
        ).map(([id, districtName]) =>
          createArea({ id: parseInt(id), name: districtName }),
        );

        return createCity({
          id: parseInt(id),
          name,
          districts: newDistricts,
          geometry: Position.PositionToGeometry({ latitude, longitude }),
        });
      },
    );

    return queryRunner.manager.save(City, cities);
  }
}
