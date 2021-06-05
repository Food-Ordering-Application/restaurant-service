import { Restaurant } from '../../restaurant/entities';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
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
  cityId: number;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.area)
  restaurants: Restaurant[];
}
