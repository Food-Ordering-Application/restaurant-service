import { MigrationInterface, QueryRunner } from 'typeorm';

export class addMerchantIdInPayPal1621489220516 implements MigrationInterface {
  name = 'addMerchantIdInPayPal1621489220516';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD "merchantIdInPayPal" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP COLUMN "merchantIdInPayPal"`,
    );
  }
}
