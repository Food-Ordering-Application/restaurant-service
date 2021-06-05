import { DeepPartial, MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Category } from '../../restaurant/entities';

export class changeRestaurantCategory1622889036636
  implements MigrationInterface {
  name = 'changeRestaurantCategory1622889036636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // update state default value
    await queryRunner.query(`ALTER TABLE "topping_item" DROP COLUMN "state"`);
    await queryRunner.query(`ALTER TABLE "menu_item" DROP COLUMN "state"`);
    await queryRunner.query(
      `ALTER TABLE "topping_item" ADD "state" character varying NOT NULL DEFAULT 'IN_STOCK'`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_item" ADD "state" character varying NOT NULL DEFAULT 'IN_STOCK'`,
    );

    // create new tables
    await queryRunner.query(
      `CREATE TABLE "category_v2" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "iconUrl" character varying NOT NULL, "displayOrder" SERIAL NOT NULL, CONSTRAINT "PK_63f5c4a79574de13d43be4311b9" PRIMARY KEY ("id"))`,
    );

    // seed data
    await this.seedData(queryRunner);

    await queryRunner.query(
      `CREATE TABLE "restaurant_categories_category" ("restaurantId" uuid NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_f85d407b317e1114a386e0aec72" PRIMARY KEY ("restaurantId", "categoryId"))`,
    );

    // add indexes
    await queryRunner.query(
      `CREATE INDEX "IDX_8b3d1cafbd598019275ac16a5a" ON "restaurant_categories_category" ("restaurantId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ae4765a977eaa05fe587b1c259" ON "restaurant_categories_category" ("categoryId") `,
    );

    // add fks
    await queryRunner.query(
      `ALTER TABLE "restaurant_categories_category" ADD CONSTRAINT "FK_8b3d1cafbd598019275ac16a5a7" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_categories_category" ADD CONSTRAINT "FK_ae4765a977eaa05fe587b1c2591" FOREIGN KEY ("categoryId") REFERENCES "category_v2"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  async seedData(queryRunner: QueryRunner) {
    type CategoryJsonSchema = {
      categories: {
        name: string;
        icon: {
          value: string;
        }[];
      }[];
    };

    const seedJsonFileName = 'categories.json';
    const _path = `./${seedJsonFileName}`;
    const absolutePath = path.resolve(__dirname, _path);
    const response: CategoryJsonSchema = JSON.parse(
      fs.readFileSync(absolutePath, 'utf8'),
    );
    const { categories } = response;
    const createCategory = (data: DeepPartial<Category>): Category =>
      queryRunner.manager.create(Category, data);

    const categoryEntities = categories.map((category) => {
      const { name, icon } = category;
      const iconUrl = icon[1].value;
      return createCategory({ name, iconUrl });
    });

    return queryRunner.manager.save(Category, categoryEntities);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // remove fks
    await queryRunner.query(
      `ALTER TABLE "restaurant_categories_category" DROP CONSTRAINT "FK_ae4765a977eaa05fe587b1c2591"`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_categories_category" DROP CONSTRAINT "FK_8b3d1cafbd598019275ac16a5a7"`,
    );
    // remove indexes
    await queryRunner.query(`DROP INDEX "IDX_ae4765a977eaa05fe587b1c259"`);
    await queryRunner.query(`DROP INDEX "IDX_8b3d1cafbd598019275ac16a5a"`);

    // remove tables
    await queryRunner.query(`DROP TABLE "restaurant_categories_category"`);
    await queryRunner.query(`DROP TABLE "category_v2"`);
  }
}
