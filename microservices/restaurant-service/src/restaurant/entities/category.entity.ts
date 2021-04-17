import {
  Column,
  Entity,
  JoinColumn,
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

  @ManyToMany(() => Restaurant, (restaurant) => restaurant.categories)
  restaurants: Restaurant[];
}
