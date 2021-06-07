import { Position } from './../../geo/types/position';
import { Area } from '../../geo/entities';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class addGeometryForArea1622985788954 implements MigrationInterface {
  name = 'addGeometryForArea1622985788954';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "area" ADD "geometry" geometry(Point,4326)`,
    );
    await queryRunner.query(`ALTER TABLE "area" ADD "isPrecise" boolean`);
    await queryRunner.query(
      `CREATE INDEX "IDX_18c72f6a667bbc413745d46e81" ON "restaurant" USING GiST ("geom") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9396e79e010f8d94c89e27cb52" ON "area" USING GiST ("geometry") `,
    );

    await this.seedDistricts(queryRunner);

    await queryRunner.query(
      `ALTER TABLE "area" ALTER COLUMN "geometry" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "area" ALTER COLUMN "isPrecise" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_9396e79e010f8d94c89e27cb52"`);
    await queryRunner.query(`DROP INDEX "IDX_18c72f6a667bbc413745d46e81"`);
    await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "isPrecise"`);
    await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "geometry"`);
  }

  async seedDistricts(queryRunner: QueryRunner) {
    type DistrictsJsonSchema = {
      id: string;
      name: string;
      latitude: number;
      longitude: number;
      isDefault: boolean;
    }[];

    const seedJsonFileName = 'districts.json';
    const _path = `./${seedJsonFileName}`;
    const absolutePath = path.resolve(__dirname, _path);
    const response: DistrictsJsonSchema = JSON.parse(
      fs.readFileSync(absolutePath, 'utf8'),
    );

    const districts = await queryRunner.manager.find(Area);
    const newDistricts: Area[] = districts.map((district) => {
      const { id } = district;
      const found = response.find(
        (data) => data.id.toString() == id.toString(),
      );
      if (found) {
        const { isDefault, latitude, longitude } = found;
        return {
          ...district,
          geometry: Position.PositionToGeometry({ longitude, latitude }),
          isPrecise: !isDefault,
        };
      }
      return district;
    });

    return queryRunner.manager.save(Area, newDistricts);
  }
}
