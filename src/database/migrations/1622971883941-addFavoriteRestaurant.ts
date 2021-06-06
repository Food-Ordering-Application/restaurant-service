import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFavoriteRestaurant1622971883941 implements MigrationInterface {
  name = 'addFavoriteRestaurant1622971883941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorite_restaurant" ("customerId" uuid NOT NULL, "restaurantId" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_31ec69f21ea2494b6181ff2fd06" PRIMARY KEY ("customerId", "restaurantId"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_31ec69f21ea2494b6181ff2fd0" ON "favorite_restaurant" ("customerId", "restaurantId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_restaurant" ADD CONSTRAINT "FK_4c0ca7a1d4fc61af1b67c0fb2c3" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorite_restaurant" DROP CONSTRAINT "FK_4c0ca7a1d4fc61af1b67c0fb2c3"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_31ec69f21ea2494b6181ff2fd0"`);
    await queryRunner.query(`DROP TABLE "favorite_restaurant"`);
  }
}
