import {
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Restaurant } from '.';

@Entity()
@Index(['customerId', 'restaurantId'], { unique: true })
export class FavoriteRestaurant {
  @PrimaryColumn('uuid')
  @Index()
  customerId: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.favoriteByUsers)
  @JoinColumn()
  restaurant: Restaurant;

  @PrimaryColumn('uuid')
  restaurantId: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: Date;
}
