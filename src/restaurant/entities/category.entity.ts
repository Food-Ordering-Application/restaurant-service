import {
  Column,
  Entity,
  Generated,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity('category_v2')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  iconUrl: string;

  @Column()
  @Generated('increment')
  displayOrder: number;

  @ManyToMany(() => Restaurant, (restaurant) => restaurant.categories)
  restaurant: Restaurant;
}
