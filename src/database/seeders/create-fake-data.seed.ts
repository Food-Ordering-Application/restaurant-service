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
    const restaurants = await factory(Restaurant)({}).createMany(20);
    for (const restaurant of restaurants) {
      // Với mỗi nhà hàng tạo 2 openHour
      await factory(OpenHour)({ restaurantId: restaurant.id }).createMany(2);
      // Với mỗi nhà hàng tạo 1 menu
      const menu = await factory(Menu)({
        restaurantId: restaurant.id,
      }).create();
      // Với mỗi menu tạo 3 menuGroup
      const menuGroups = await factory(MenuGroup)({
        menuId: menu.id,
      }).createMany(2);
      // Với mỗi nhà hàng tạo 3 toppingGroup
      const toppingGroups = await factory(ToppingGroup)({
        restaurantId: restaurant.id,
      }).createMany(2);
      // Tạo MenuItem
      const menuItems = await Promise.all([
        factory(MenuItem)({
          menu: menu,
          menuGroup: menuGroups[0],
        }).createMany(2),
        factory(MenuItem)({
          menu: menu,
          menuGroup: menuGroups[1],
        }).createMany(2),
      ]);
      // Mỗi toppingGroup tạo nhiều toppingItem
      const toppingItems = await Promise.all([
        factory(ToppingItem)({
          toppingGroup: toppingGroups[0],
        }).createMany(2),
        factory(ToppingItem)({
          toppingGroup: toppingGroups[1],
        }).createMany(2),
      ]);

      // Tạo MenuItemTopping
      const menuItemToppings = await Promise.all([
        factory(MenuItemTopping)({
          menuItem: menuItems[0][0],
          toppingItem: toppingItems[0][0],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0][0],
          toppingItem: toppingItems[0][1],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0][0],
          toppingItem: toppingItems[1][0],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0][0],
          toppingItem: toppingItems[1][1],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0][1],
          toppingItem: toppingItems[0][0],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0][1],
          toppingItem: toppingItems[0][1],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0][1],
          toppingItem: toppingItems[1][0],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0][1],
          toppingItem: toppingItems[1][1],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][0],
          toppingItem: toppingItems[0][0],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][0],
          toppingItem: toppingItems[0][1],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][0],
          toppingItem: toppingItems[1][0],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][0],
          toppingItem: toppingItems[1][1],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][1],
          toppingItem: toppingItems[0][0],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][1],
          toppingItem: toppingItems[0][1],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][1],
          toppingItem: toppingItems[1][0],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][1],
          toppingItem: toppingItems[1][1],
        }).create(),
      ]);
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
