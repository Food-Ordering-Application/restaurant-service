import { Repository } from 'typeorm';
import { Restaurant } from '../entities';

export const createGetSomeRestaurantQuery = async (
  searchName: string,
  area: string,
  category: string,
  pageNumber: number,
  restaurantRepository: Repository<Restaurant>,
) => {
  let restaurants = null;
  if (!category && !searchName) {
    restaurants = await restaurantRepository
      .createQueryBuilder('res')
      .select([
        'res.name',
        'res.isActive',
        'res.address',
        'res.coverImageUrl',
        'res.id',
        'res.rating',
      ])
      .leftJoinAndSelect('res.categories', 'categories')
      .where('res.area = :area', {
        area: area,
      })
      .skip((pageNumber - 1) * 25)
      .take(25)
      .getMany();
  } else if (category) {
    restaurants = await restaurantRepository
      .createQueryBuilder('res')
      .select([
        'res.name',
        'res.isActive',
        'res.address',
        'res.coverImageUrl',
        'res.id',
        'res.rating',
      ])
      .leftJoinAndSelect('res.categories', 'categories')
      .where('res.area = :area AND categories.type = :categoryType', {
        categoryType: category,
        area: area,
      })
      .skip((pageNumber - 1) * 25)
      .take(25)
      .getMany();
  } else if (searchName) {
    restaurants = await restaurantRepository
      .createQueryBuilder('res')
      .select([
        'res.name',
        'res.isActive',
        'res.address',
        'res.coverImageUrl',
        'res.id',
        'res.rating',
      ])
      .leftJoinAndSelect('res.categories', 'categories')
      .where('res.area = :area AND res.name ILIKE :restaurantName', {
        restaurantName: `%${searchName}%`,
        area: area,
      })
      .skip((pageNumber - 1) * 25)
      .take(25)
      .getMany();
  }
  return restaurants;
};
