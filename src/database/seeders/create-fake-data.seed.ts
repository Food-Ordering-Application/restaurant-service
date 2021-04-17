import {
  OpenHour,
  Restaurant,
  RestaurantAddress,
} from '../../restaurant/entities/index';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateFakeData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const restaurants = await factory(Restaurant)().createMany(20);
    // Với mỗi nhà hàng tạo 7 openHour
    for (const restaurant of restaurants) {
      await factory(OpenHour)({ restaurantId: restaurant.id }).createMany(7);
    }
    // Với mỗi nhà hàng tạo 1 địa chỉ nhà hàng
    for (const restaurant of restaurants) {
      await factory(RestaurantAddress)({
        restaurantId: restaurant.id,
      }).create();
    }
  }
}
