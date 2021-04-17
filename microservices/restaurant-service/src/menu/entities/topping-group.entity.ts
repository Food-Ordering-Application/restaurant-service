import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ToppingItem } from './topping-item.entity';

@Entity()
export class ToppingGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.toppingGroups)
  @JoinColumn()
  restaurant: Restaurant;

  @OneToMany(() => ToppingItem, (toppingItem) => toppingItem.group)
  toppingItems: ToppingItem[];

  @Column()
  name: string;

  @Column()
  index: number;

  @Column({ default: true })
  isActive: boolean;
}
