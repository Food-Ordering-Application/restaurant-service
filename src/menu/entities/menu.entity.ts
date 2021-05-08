import { ToppingItem } from './topping-item.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuGroup } from './menu-group.entity';
import { MenuItem } from './menu-item.entity';
import { ToppingGroup } from '.';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Restaurant, (restaurant) => restaurant.menu)
  @JoinColumn()
  restaurant: Restaurant;

  @Column()
  restaurantId: string;

  @OneToMany(() => MenuGroup, (menuGroup) => menuGroup.menu)
  menuGroups: MenuGroup[];

  @OneToMany(() => ToppingGroup, (toppingGroup) => toppingGroup.menu)
  toppingGroups: ToppingGroup[];

  @OneToMany(() => MenuItem, (menuItem) => menuItem.menu)
  menuItems: MenuItem[];

  @OneToMany(() => ToppingItem, (toppingItem) => toppingItem.menu)
  toppingItems: ToppingItem[];

  @Column()
  name: string;

  @Column()
  index: number;

  @Column({ default: true })
  isActive: boolean;

  @DeleteDateColumn()
  deletedAt: Date;
}
