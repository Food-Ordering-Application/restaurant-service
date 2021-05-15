import { MigrationInterface, QueryRunner } from 'typeorm';

export class addMenuIdAndIsOutOfStock1621086515130
  implements MigrationInterface {
  name = 'addMenuIdAndIsOutOfStock1621086515130';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "menu_item_topping" ADD "menuId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_item" ADD "isOutOfStock" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_item_topping" ADD CONSTRAINT "FK_cef6bf62488d9614e97d8fa9a8f" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `update "menu_item_topping" set "menuId" = MI."menuId" from "menu_item" MI where MI.id = "menuItemId"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "menu_item_topping" DROP CONSTRAINT "FK_cef6bf62488d9614e97d8fa9a8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_item" DROP COLUMN "isOutOfStock"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_item_topping" DROP COLUMN "menuId"`,
    );
  }
}
