import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Menu } from '.';
import { State } from '../enums';
import { MenuItemTopping } from './menu-item-topping.entity';
import { ToppingGroup } from './topping-group.entity';

@Entity()
export class ToppingItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Menu, (menu) => menu.toppingItems)
  @JoinColumn()
  menu: Menu;

  @Column({ nullable: true })
  @Index()
  menuId: string;

  @ManyToOne(() => ToppingGroup, (toppingGroup) => toppingGroup.toppingItems)
  @JoinColumn()
  toppingGroup: ToppingGroup;

  @Column()
  @Index()
  toppingGroupId: string;

  @OneToMany(
    () => MenuItemTopping,
    (menuItemTopping) => menuItemTopping.toppingItem,
  )
  menuItemToppings: MenuItemTopping[];

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  maxQuantity: number;

  @Column()
  @Index()
  index: number;

  @Column({ default: true })
  @Index()
  isActive: boolean;

  @Column({ enum: State, default: State.IN_STOCK })
  state: State;

  @DeleteDateColumn()
  deletedAt: Date;
}
