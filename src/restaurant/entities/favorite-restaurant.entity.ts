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
  customerId: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.favoriteByUsers)
  @JoinColumn()
  restaurant: Restaurant;

  @PrimaryColumn('uuid')
  restaurantId: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
