import { Category, Restaurant } from '../../restaurant/entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedCategory1623354004480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const restaurants = await queryRunner.manager.find(Restaurant);
    const categories = await queryRunner.manager.find(Category);
    function randomInteger(min, max): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const getRandomCategory = () => {
      const randomCategoryId = randomInteger(0, 12);
      return categories[randomCategoryId];
    };
    restaurants.forEach((restaurant) => {
      const category = getRandomCategory();
      if (!category.restaurants) category.restaurants = [];
      category.restaurants.push(restaurant);
    });

    await Promise.all(
      categories.map((category) => queryRunner.manager.save(category)),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
