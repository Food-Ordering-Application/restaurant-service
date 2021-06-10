import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIndexes1623356367301 implements MigrationInterface {
  name = 'addIndexes1623356367301';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_5d3fa85bc4f03b807e61bb2a91" ON "favorite_restaurant" ("customerId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_22df8a28be0749d592b05a8928" ON "favorite_restaurant" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_a45643baa17832f4ead4029086" ON "favorite_restaurant" ("customerId", "restaurantId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a686871e76438259418aa5face" ON "menu_item" ("menuId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b79e9a0341d962bdc8be54e71b" ON "menu_item" ("menuGroupId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a6c6c7a20945c819715fce3380" ON "menu_item" ("index") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c8cfee864914725a235858522d" ON "menu_item" ("isActive") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a33ef23be107a5288366b107b5" ON "menu_group" ("menuId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d87074d168c1786fe1312dd4ce" ON "menu_group" ("isActive") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_426f09c69f94e5faeb65744fab" ON "menu_group" ("index") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9269dfd2fe5c73b239d1772916" ON "topping_item" ("menuId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_57ca769d87a46828a01117b6cc" ON "topping_item" ("toppingGroupId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bcb810901d48d3b40a65c0db5a" ON "topping_item" ("index") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3b116fc271ff43e27f613e1091" ON "topping_item" ("isActive") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ef8da3bbf426039d29dbc4b1e8" ON "topping_group" ("menuId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7eb98c07902544e01cf3ea7806" ON "topping_group" ("isActive") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_027dc90b4e96459dfac97dee61" ON "topping_group" ("index") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cef6bf62488d9614e97d8fa9a8" ON "menu_item_topping" ("menuId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dac75db9b6e77806a2ceb3fb40" ON "menu_item_topping" ("menuItemId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_49f5a8d200669811a223317127" ON "menu_item_topping" ("toppingItemId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_26ad57dc75500d974ca072de83" ON "menu_item_topping" ("menuItemId", "toppingItemId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_278375a3f8cfc158f50509ad23" ON "restaurant" ("owner") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9315499c5bf5ead89fbb877a0b" ON "restaurant" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0f34d0015eb30c866518f6a86f" ON "restaurant" ("rating") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2dee218ec5352ede6b4d56dcc7" ON "restaurant" ("cityId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_18299870e34923dc98d23ef18d" ON "restaurant" ("areaId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cffe05f012e686a6da9002b259" ON "restaurant" ("isVerified", "isActive", "isBanned") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5a7a68da585a2e006272cd7a39" ON "open_hour" ("day") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f335d449f3c45e450239b293b0" ON "area" ("cityId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_f335d449f3c45e450239b293b0"`);
    await queryRunner.query(`DROP INDEX "IDX_5a7a68da585a2e006272cd7a39"`);
    await queryRunner.query(`DROP INDEX "IDX_cffe05f012e686a6da9002b259"`);
    await queryRunner.query(`DROP INDEX "IDX_18299870e34923dc98d23ef18d"`);
    await queryRunner.query(`DROP INDEX "IDX_2dee218ec5352ede6b4d56dcc7"`);
    await queryRunner.query(`DROP INDEX "IDX_0f34d0015eb30c866518f6a86f"`);
    await queryRunner.query(`DROP INDEX "IDX_9315499c5bf5ead89fbb877a0b"`);
    await queryRunner.query(`DROP INDEX "IDX_278375a3f8cfc158f50509ad23"`);
    await queryRunner.query(`DROP INDEX "IDX_26ad57dc75500d974ca072de83"`);
    await queryRunner.query(`DROP INDEX "IDX_49f5a8d200669811a223317127"`);
    await queryRunner.query(`DROP INDEX "IDX_dac75db9b6e77806a2ceb3fb40"`);
    await queryRunner.query(`DROP INDEX "IDX_cef6bf62488d9614e97d8fa9a8"`);
    await queryRunner.query(`DROP INDEX "IDX_027dc90b4e96459dfac97dee61"`);
    await queryRunner.query(`DROP INDEX "IDX_7eb98c07902544e01cf3ea7806"`);
    await queryRunner.query(`DROP INDEX "IDX_ef8da3bbf426039d29dbc4b1e8"`);
    await queryRunner.query(`DROP INDEX "IDX_3b116fc271ff43e27f613e1091"`);
    await queryRunner.query(`DROP INDEX "IDX_bcb810901d48d3b40a65c0db5a"`);
    await queryRunner.query(`DROP INDEX "IDX_57ca769d87a46828a01117b6cc"`);
    await queryRunner.query(`DROP INDEX "IDX_9269dfd2fe5c73b239d1772916"`);
    await queryRunner.query(`DROP INDEX "IDX_426f09c69f94e5faeb65744fab"`);
    await queryRunner.query(`DROP INDEX "IDX_d87074d168c1786fe1312dd4ce"`);
    await queryRunner.query(`DROP INDEX "IDX_a33ef23be107a5288366b107b5"`);
    await queryRunner.query(`DROP INDEX "IDX_c8cfee864914725a235858522d"`);
    await queryRunner.query(`DROP INDEX "IDX_a6c6c7a20945c819715fce3380"`);
    await queryRunner.query(`DROP INDEX "IDX_b79e9a0341d962bdc8be54e71b"`);
    await queryRunner.query(`DROP INDEX "IDX_a686871e76438259418aa5face"`);
    await queryRunner.query(`DROP INDEX "IDX_a45643baa17832f4ead4029086"`);
    await queryRunner.query(`DROP INDEX "IDX_22df8a28be0749d592b05a8928"`);
    await queryRunner.query(`DROP INDEX "IDX_5d3fa85bc4f03b807e61bb2a91"`);
  }
}
