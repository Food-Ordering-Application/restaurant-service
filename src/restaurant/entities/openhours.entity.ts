import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DaysOfWeek } from '../enums/day.enum';
import { Restaurant } from './restaurant.entity';

@Entity()
export class OpenHour {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.openHours)
  @JoinColumn()
  restaurant: Restaurant;

  @Column({ enum: DaysOfWeek })
  @Index()
  day: string;

  @Column()
  fromHour: number;

  @Column()
  fromMinute: number;

  @Column()
  toHour: number;

  @Column()
  toMinute: number;
}
