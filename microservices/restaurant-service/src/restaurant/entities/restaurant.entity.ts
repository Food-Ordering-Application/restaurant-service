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
import { OpenHour } from './openhours.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  owner: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  coverImageUrl: string;

  @Column({ nullable: true })
  verifiedImageUrl: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ default: 0 })
  numRate: number;

  @Column({ default: 0 })
  rating: number;

  @Column({ nullable: true })
  address: string;

  @Column({ default: 'TPHCM' })
  city: string;

  @Column({ default: 'TPHCM' })
  area: string;

  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  geom: { type: string; coordinates: number[] };

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: true })
  isVerified: boolean;

  @OneToMany(() => OpenHour, (openHours) => openHours.restaurant)
  openhours: OpenHour[];

  @ManyToMany(() => Category, (category) => category.restaurants, {
    eager: true,
  })
  @JoinTable()
  categories: Category[];

  @OneToOne(() => Menu, (menu) => menu.restaurant)
  menu: Menu;

  @OneToMany(() => ToppingGroup, (toppingGroup) => toppingGroup.restaurant)
  toppingGroups: ToppingGroup[];
}
