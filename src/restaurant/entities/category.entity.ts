import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryType } from '../enums/category-type.enum';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: CategoryType })
  type: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.categories)
  restaurant: Restaurant;
}
