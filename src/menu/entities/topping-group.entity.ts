import { Restaurant } from '../../restaurant/entities/restaurant.entity';
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
import { ToppingItem } from './topping-item.entity';
import { Menu } from '.';

@Entity()
export class ToppingGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Menu, (menu) => menu.toppingGroups)
  @JoinColumn()
  menu: Menu;

  @Column({ nullable: true })
  @Index()
  menuId: string;

  @OneToMany(() => ToppingItem, (toppingItem) => toppingItem.toppingGroup)
  toppingItems: ToppingItem[];

  @Column()
  name: string;

  @Column({ default: true })
  @Index()
  isActive: boolean;

  @Column()
  @Index()
  index: number;

  @DeleteDateColumn()
  deletedAt: Date;
}
