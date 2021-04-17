import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DaysOfWeek } from '../enums/day.enum';
import { Restaurant } from './restaurant.entity';

@Entity()
export class OpenHours {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.openhours)
  @JoinColumn()
  restaurant: Restaurant;

  @Column({ enum: DaysOfWeek })
  day: string;

  @Column()
  fromHour: number;

  @Column()
  fromMinute: number;

  @Column()
  toHour: string;

  @Column()
  toMinute: string;
}
