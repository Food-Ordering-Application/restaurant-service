import { MenuItemTopping } from '../../menu/entities/menu-item-topping.entity';
import { Menu } from '../../menu/entities/menu.entity';
import { ToppingGroup } from '../../menu/entities/topping-group.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { OpenHours } from './openhours.entity';
import { RestaurantAddress } from './restaurant-address.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  owner: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ default: 0 })
  numRate: number;

  @Column({ default: 0 })
  rating: number;

  @Column({ default: 'TPHCM' })
  area: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(
    () => RestaurantAddress,
    (restaurantAddress) => restaurantAddress.restaurant,
  )
  address: RestaurantAddress;

  @OneToMany(() => OpenHours, (openHours) => openHours.restaurant)
  openhours: OpenHours[];

  @ManyToMany(() => Category, (category) => category.restaurants)
  @JoinTable()
  categories: Category[];

  @OneToOne(() => Menu, (menu) => menu.restaurant)
  menu: Menu;

  @OneToMany(
    () => MenuItemTopping,
    (menuItemTopping) => menuItemTopping.restaurant,
  )
  menuItemToppings: MenuItemTopping[];

  @OneToMany(() => ToppingGroup, (toppingGroup) => toppingGroup.restaurant)
  toppingGroups: ToppingGroup[];
}
