import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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
