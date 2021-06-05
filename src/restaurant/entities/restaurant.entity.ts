import { Menu } from '../../menu/entities/menu.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category, OpenHour } from '.';
import { Area, City } from '../../geo/entities';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  owner: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
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

  @Column({ nullable: false })
  address: string;

  @Column({
    nullable: false,
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  geom: { type: string; coordinates: number[] };

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isBanned: boolean;

  @ManyToOne(() => City, (city) => city.restaurants)
  city: City;

  @Column()
  cityId: number;

  @ManyToOne(() => Area, (area) => area.restaurants)
  area: Area;

  @Column()
  areaId: number;

  @OneToMany(() => OpenHour, (openHours) => openHours.restaurant, {
    cascade: ['update', 'insert'],
  })
  openHours: OpenHour[];

  @ManyToMany(() => Category, (category) => category.restaurants, {
    cascade: ['update', 'insert'],
  })
  @JoinTable({
    name: 'restaurant_categories_category',
    joinColumn: {
      name: 'restaurantId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  @OneToOne(() => Menu, (menu) => menu.restaurant)
  menu: Menu;

  @Column({ default: null })
  merchantIdInPayPal: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
