import { Menu, MenuItem, ToppingItem } from '.';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
@Index(['menuItemId', 'toppingItemId'])
export class MenuItemTopping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Menu, (menu) => menu.menuItemToppings)
  @JoinColumn()
  menu: Menu;

  @Column({ nullable: true })
  @Index()
  menuId: string;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.menuItemToppings)
  @JoinColumn()
  menuItem: MenuItem;

  @Column({ nullable: true })
  @Index()
  menuItemId: string;

  @ManyToOne(() => ToppingItem, (toppingItem) => toppingItem.menuItemToppings)
  toppingItem: ToppingItem;

  @Column({ nullable: true })
  @Index()
  toppingItemId: string;

  @Column({ nullable: true })
  customPrice: number;

  @DeleteDateColumn()
  deletedAt: Date;
}
