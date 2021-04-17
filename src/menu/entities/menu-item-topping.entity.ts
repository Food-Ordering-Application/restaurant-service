import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuItem } from './menu-item.entity';
import { ToppingItem } from './topping-item.entity';

@Entity()
export class MenuItemTopping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.menuItemToppings)
  @JoinColumn()
  menuItem: MenuItem;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menuItemToppings)
  restaurant: Restaurant;

  @OneToOne(() => ToppingItem, (toppingItem) => toppingItem.menuItemTopping)
  @JoinColumn()
  toppingItem: ToppingItem;

  @Column()
  customPrice: number;
}
