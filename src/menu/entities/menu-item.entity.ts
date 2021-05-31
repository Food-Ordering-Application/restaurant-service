import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { State } from '../enums';
import { MenuGroup } from './menu-group.entity';
import { MenuItemTopping } from './menu-item-topping.entity';
import { Menu } from './menu.entity';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Menu, (menu) => menu.menuItems)
  @JoinColumn()
  menu: Menu;

  @Column({ nullable: true })
  menuId: string;

  @ManyToOne(() => MenuGroup, (menuGroup) => menuGroup.menuItems)
  @JoinColumn()
  menuGroup: MenuGroup;

  @Column({ nullable: true })
  menuGroupId: string;

  @OneToMany(
    () => MenuItemTopping,
    (menuItemTopping) => menuItemTopping.menuItem,
  )
  menuItemToppings: MenuItemTopping[];

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  imageUrl: string;

  @Column()
  index: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ enum: State, default: State.IN_STOCK })
  state: State;

  @DeleteDateColumn()
  deletedAt: Date;
}
