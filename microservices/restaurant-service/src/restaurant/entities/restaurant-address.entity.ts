import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class RestaurantAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Restaurant, (restaurant) => restaurant.address)
  @JoinColumn()
  restaurant: Restaurant;

  @Column()
  address: string;

  @Column()
  latitude: string;

  @Column()
  longtitude: string;
}
