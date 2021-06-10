import { Restaurant } from '../../restaurant/entities';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { City } from '.';

@Entity('area')
export class Area {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => City, (city) => city.districts)
  city: City;

  @Column()
  @Index()
  cityId: number;

  @Column({
    nullable: false,
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  @Index({ spatial: true })
  geometry: { type: string; coordinates: number[] };

  @Column()
  isPrecise: boolean;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.area)
  restaurants: Restaurant[];
}
