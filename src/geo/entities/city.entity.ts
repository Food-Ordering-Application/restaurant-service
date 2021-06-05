import { Area } from '.';
import { Restaurant } from '../../restaurant/entities';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('city')
export class City {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: false,
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  geometry: { type: string; coordinates: number[] };

  @OneToMany(() => Area, (area) => area.city, { cascade: ['insert'] })
  districts: Area[];

  @OneToMany(() => Restaurant, (restaurant) => restaurant.city)
  restaurants: Restaurant[];
}
