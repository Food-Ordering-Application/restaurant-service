import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuItemTopping } from './menu-item-topping.entity';
import { ToppingGroup } from './topping-group.entity';

@Entity()
export class ToppingItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ToppingGroup, (toppingGroup) => toppingGroup.toppingItems)
  @JoinColumn()
  group: ToppingGroup;

  @OneToOne(
    () => MenuItemTopping,
    (menuItemTopping) => menuItemTopping.toppingItem,
  )
  menuItemTopping: MenuItemTopping;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  maxQuantity: number;

  @Column()
  index: number;

  @Column({ default: true })
  isActive: boolean;
}
