import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuItem } from './menu-item.entity';
import { Menu } from './menu.entity';

@Entity()
export class MenuGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Menu, (menu) => menu.menuGroups)
  @JoinColumn()
  menu: Menu;

  @Column()
  menuId: string;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.menuGroup)
  menuItems: MenuItem[];

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  index: number;
}
