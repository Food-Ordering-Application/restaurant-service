import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuGroup } from './menu-group.entity';
import { MenuItem } from './menu-item.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Restaurant, (restaurant) => restaurant.menu)
  @JoinColumn()
  restaurant: Restaurant;

  @OneToMany(() => MenuGroup, (menuGroup) => menuGroup.menu)
  menuGroups: MenuGroup[];

  @OneToMany(() => MenuItem, (menuItem) => menuItem.menu)
  menuItems: MenuItem[];

  @Column()
  name: string;

  @Column()
  index: number;
}
