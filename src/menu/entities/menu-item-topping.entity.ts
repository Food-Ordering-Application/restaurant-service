import { Menu, MenuItem, ToppingItem } from '.';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class MenuItemTopping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Menu, (menu) => menu.menuItemToppings)
  @JoinColumn()
  menu: Menu;

  @Column()
  menuId: string;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.menuItemToppings)
  @JoinColumn()
  menuItem: MenuItem;

  @Column()
  menuItemId: string;

  @ManyToOne(() => ToppingItem, (toppingItem) => toppingItem.menuItemToppings)
  toppingItem: ToppingItem;

  @Column()
  toppingItemId: string;

  @Column({ nullable: true })
  customPrice: number;

  @DeleteDateColumn()
  deletedAt: Date;
}
