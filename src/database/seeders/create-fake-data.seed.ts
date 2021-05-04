import {
  Category,
  OpenHour,
  Restaurant,
} from '../../restaurant/entities/index';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { CategoryType } from '../../restaurant/enums/category-type.enum';
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuItemTopping,
  ToppingGroup,
  ToppingItem,
} from '../../menu/entities/index';

export default class CreateFakeData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // Tạo menuItemToppings
    const menuItemToppings = await factory(MenuItemTopping)().createMany(160);
    // Tạo toppingItems
    const toppingItems = [];
    for (let i = 0; i < 160; i += 2) {
      toppingItems.push(
        await factory(ToppingItem)({
          menuItemToppings: menuItemToppings.slice(i, i + 2),
        }).create(),
      );
    }
    // Tạo toppingGroups
    const toppingGroups = [];
    for (let i = 0; i < 80; i += 2) {
      toppingGroups.push(
        await factory(ToppingGroup)({
          toppingItems: toppingItems.slice(i, i + 2),
        }).create(),
      );
    }

    // Tạo MenuItem
    const menuItems = [];
    for (let i = 0; i < 160; i += 2) {
      menuItems.push(
        await factory(MenuItem)({
          menuItemToppings: menuItemToppings.slice(i, i + 2),
        }).create(),
      );
    }
    // Với mỗi menu tạo 3 menuGroup
    const menuGroups = [];
    for (let i = 0; i < 80; i += 2) {
      menuGroups.push(
        await factory(MenuGroup)({
          menuItems: menuItems.slice(i, i + 2),
        }).create(),
      );
    }
    // Tạo tất cả menu
    const menus = [];
    for (let i = 0; i <= 80; i += 2) {
      menus.push(
        await factory(Menu)({
          menuItems: menuItems.slice(i * 4, i * 4 + 4),
          menuGroups: menuGroups.slice(i, i + 2),
        }).create(),
      );
    }

    // Tạo tất cả openhours
    const openHours = await factory(OpenHour)().createMany(40);

    const restaurants = [];
    for (let i = 0; i < 40; i += 1) {
      restaurants.push(
        await factory(Restaurant)({
          openHours: openHours.slice(i * 2, i * 2 + 2),
          menu: menus.slice(i, i + 1),
        }).create(),
      );
    }
    // Tạo 4 restaurant-category và mỗi category gán 5 nhà hàng
    await factory(Category)({ restaurants: restaurants.slice(0, 5) }).create({
      type: CategoryType.CAFEDESSERT,
    });
    await factory(Category)({ restaurants: restaurants.slice(5, 10) }).create({
      type: CategoryType.RESTAURANT,
    });
    await factory(Category)({
      restaurants: restaurants.slice(10, 15),
    }).create({
      type: CategoryType.STREETFOOD,
    });
    await factory(Category)({
      restaurants: restaurants.slice(15, 20),
    }).create({
      type: CategoryType.VETERIAN,
    });
  }
}
