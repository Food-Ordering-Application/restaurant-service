import {MigrationInterface, QueryRunner} from "typeorm";

export class addOutOfStockState1622470453157 implements MigrationInterface {
    name = 'addOutOfStockState1622470453157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_item" DROP COLUMN "isOutOfStock"`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD "isOutOfStock" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "topping_item" ADD "state" character varying NOT NULL DEFAULT 'IN_STOCK'`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD "state" character varying NOT NULL DEFAULT 'IN_STOCK'`);
        await queryRunner.query(`ALTER TABLE "topping_group" DROP CONSTRAINT "FK_ef8da3bbf426039d29dbc4b1e85"`);
        await queryRunner.query(`ALTER TABLE "topping_group" ALTER COLUMN "menuId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topping_item" DROP CONSTRAINT "FK_9269dfd2fe5c73b239d17729163"`);
        await queryRunner.query(`ALTER TABLE "topping_item" ALTER COLUMN "menuId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu" DROP CONSTRAINT "FK_085156de3c3a44eba017a6a0846"`);
        await queryRunner.query(`ALTER TABLE "menu" ALTER COLUMN "restaurantId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" DROP CONSTRAINT "FK_cef6bf62488d9614e97d8fa9a8f"`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" DROP CONSTRAINT "FK_dac75db9b6e77806a2ceb3fb40e"`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" DROP CONSTRAINT "FK_49f5a8d200669811a223317127f"`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ALTER COLUMN "menuId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ALTER COLUMN "menuItemId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ALTER COLUMN "toppingItemId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP CONSTRAINT "FK_a686871e76438259418aa5faceb"`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP CONSTRAINT "FK_b79e9a0341d962bdc8be54e71b8"`);
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "menuId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "menuGroupId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_group" DROP CONSTRAINT "FK_a33ef23be107a5288366b107b5d"`);
        await queryRunner.query(`ALTER TABLE "menu_group" ALTER COLUMN "menuId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topping_group" ALTER COLUMN "menuId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topping_item" ALTER COLUMN "menuId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu" ALTER COLUMN "restaurantId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ALTER COLUMN "menuId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ALTER COLUMN "menuItemId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ALTER COLUMN "toppingItemId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "menuId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "menuGroupId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_group" ALTER COLUMN "menuId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topping_group" ADD CONSTRAINT "FK_ef8da3bbf426039d29dbc4b1e85" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topping_item" ADD CONSTRAINT "FK_9269dfd2fe5c73b239d17729163" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu" ADD CONSTRAINT "FK_085156de3c3a44eba017a6a0846" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ADD CONSTRAINT "FK_cef6bf62488d9614e97d8fa9a8f" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ADD CONSTRAINT "FK_dac75db9b6e77806a2ceb3fb40e" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ADD CONSTRAINT "FK_49f5a8d200669811a223317127f" FOREIGN KEY ("toppingItemId") REFERENCES "topping_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD CONSTRAINT "FK_a686871e76438259418aa5faceb" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD CONSTRAINT "FK_b79e9a0341d962bdc8be54e71b8" FOREIGN KEY ("menuGroupId") REFERENCES "menu_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_group" ADD CONSTRAINT "FK_a33ef23be107a5288366b107b5d" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_group" DROP CONSTRAINT "FK_a33ef23be107a5288366b107b5d"`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP CONSTRAINT "FK_b79e9a0341d962bdc8be54e71b8"`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP CONSTRAINT "FK_a686871e76438259418aa5faceb"`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" DROP CONSTRAINT "FK_49f5a8d200669811a223317127f"`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" DROP CONSTRAINT "FK_dac75db9b6e77806a2ceb3fb40e"`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" DROP CONSTRAINT "FK_cef6bf62488d9614e97d8fa9a8f"`);
        await queryRunner.query(`ALTER TABLE "menu" DROP CONSTRAINT "FK_085156de3c3a44eba017a6a0846"`);
        await queryRunner.query(`ALTER TABLE "topping_item" DROP CONSTRAINT "FK_9269dfd2fe5c73b239d17729163"`);
        await queryRunner.query(`ALTER TABLE "topping_group" DROP CONSTRAINT "FK_ef8da3bbf426039d29dbc4b1e85"`);
        await queryRunner.query(`ALTER TABLE "menu_group" ALTER COLUMN "menuId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "menuGroupId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "menuId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ALTER COLUMN "toppingItemId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ALTER COLUMN "menuItemId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ALTER COLUMN "menuId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu" ALTER COLUMN "restaurantId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topping_item" ALTER COLUMN "menuId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topping_group" ALTER COLUMN "menuId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_group" ALTER COLUMN "menuId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_group" ADD CONSTRAINT "FK_a33ef23be107a5288366b107b5d" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "menuGroupId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "menuId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD CONSTRAINT "FK_b79e9a0341d962bdc8be54e71b8" FOREIGN KEY ("menuGroupId") REFERENCES "menu_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD CONSTRAINT "FK_a686871e76438259418aa5faceb" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ALTER COLUMN "toppingItemId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ALTER COLUMN "menuItemId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ALTER COLUMN "menuId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ADD CONSTRAINT "FK_49f5a8d200669811a223317127f" FOREIGN KEY ("toppingItemId") REFERENCES "topping_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ADD CONSTRAINT "FK_dac75db9b6e77806a2ceb3fb40e" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_item_topping" ADD CONSTRAINT "FK_cef6bf62488d9614e97d8fa9a8f" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu" ALTER COLUMN "restaurantId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu" ADD CONSTRAINT "FK_085156de3c3a44eba017a6a0846" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topping_item" ALTER COLUMN "menuId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topping_item" ADD CONSTRAINT "FK_9269dfd2fe5c73b239d17729163" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topping_group" ALTER COLUMN "menuId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topping_group" ADD CONSTRAINT "FK_ef8da3bbf426039d29dbc4b1e85" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "topping_item" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP COLUMN "isOutOfStock"`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD "isOutOfStock" boolean NOT NULL DEFAULT false`);
    }

}
