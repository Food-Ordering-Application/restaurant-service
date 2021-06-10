import { FavoriteRestaurant } from './favorite-restaurant.entity';
import { Menu } from '../../menu/entities/menu.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
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
@Index(['isVerified', 'isActive', 'isBanned'])
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  @Index()
  owner: string;

  @Column({ nullable: false })
  @Index()
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
  @Index()
  rating: number;

  @Column({ nullable: false })
  address: string;

  @Column({
    nullable: false,
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  @Index({ spatial: true })
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
  @Index()
  cityId: number;

  @ManyToOne(() => Area, (area) => area.restaurants)
  area: Area;

  @Column()
  @Index()
  areaId: number;

  @OneToMany(() => OpenHour, (openHours) => openHours.restaurant, {
    cascade: ['update', 'insert'],
  })
  openHours: OpenHour[];

  @OneToMany(
    () => FavoriteRestaurant,
    (favoriteRestaurant) => favoriteRestaurant.restaurant,
  )
  favoriteByUsers: FavoriteRestaurant[];

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
