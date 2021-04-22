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
    const restaurants = await factory(Restaurant)().createMany(300);
    for (const restaurant of restaurants) {
      // Với mỗi nhà hàng tạo 7 openHour
      await factory(OpenHour)({ restaurantId: restaurant.id }).createMany(7);
      // Với mỗi nhà hàng tạo 1 menu
      const menu = await factory(Menu)({
        restaurantId: restaurant.id,
      }).create();
      // Với mỗi menu tạo 3 menuGroup
      const menuGroups = await factory(MenuGroup)({
        menuId: menu.id,
      }).createMany(3);
      // Với mỗi nhà hàng tạo 3 toppingGroup
      const toppingGroups = await factory(ToppingGroup)({
        restaurantId: restaurant.id,
      }).createMany(3);
      // Tạo MenuItem
      const menuItems = await Promise.all([
        factory(MenuItem)({
          menuId: menu.id,
          menuGroup: menuGroups[0],
        }).createMany(2),
        factory(MenuItem)({
          menuId: menu.id,
          menuGroup: menuGroups[1],
        }).createMany(2),
        factory(MenuItem)({
          menuId: menu.id,
          menuGroup: menuGroups[2],
        }).createMany(2),
      ]);
      // Mỗi toppingGroup tạo nhiều toppingItem
      const toppingItems = await Promise.all([
        factory(ToppingItem)({
          toppingGroup: toppingGroups[0],
        }).createMany(3),
        factory(ToppingItem)({
          toppingGroup: toppingGroups[1],
        }).createMany(3),
        factory(ToppingItem)({
          toppingGroup: toppingGroups[2],
        }).createMany(3),
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
          toppingItem: toppingItems[0][2],
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
          menuItem: menuItems[0][0],
          toppingItem: toppingItems[1][2],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0][0],
          toppingItem: toppingItems[2][0],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0][0],
          toppingItem: toppingItems[2][1],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0][0],
          toppingItem: toppingItems[2][2],
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
          toppingItem: toppingItems[0][2],
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
          menuItem: menuItems[0][1],
          toppingItem: toppingItems[1][2],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0][1],
          toppingItem: toppingItems[2][0],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0][1],
          toppingItem: toppingItems[2][1],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0][1],
          toppingItem: toppingItems[2][2],
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
          toppingItem: toppingItems[0][2],
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
          menuItem: menuItems[1][0],
          toppingItem: toppingItems[1][2],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][0],
          toppingItem: toppingItems[2][0],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][0],
          toppingItem: toppingItems[2][1],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][0],
          toppingItem: toppingItems[2][2],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][1],
          toppingItem: toppingItems[0][1],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][1],
          toppingItem: toppingItems[0][2],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][1],
          toppingItem: toppingItems[1][0],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][1],
          toppingItem: toppingItems[1][1],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][1],
          toppingItem: toppingItems[1][2],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][1],
          toppingItem: toppingItems[2][0],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][1],
          toppingItem: toppingItems[2][1],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1][1],
          toppingItem: toppingItems[2][2],
        }).create(),
      ]);
    }
    // Tạo 4 restaurant-category và mỗi category gán 5 nhà hàng
    await factory(Category)({ restaurants: restaurants.slice(0, 50) }).create({
      type: CategoryType.CAFEDESSERT,
    });
    await factory(Category)({ restaurants: restaurants.slice(50, 100) }).create(
      {
        type: CategoryType.RESTAURANT,
      },
    );
    await factory(Category)({
      restaurants: restaurants.slice(100, 150),
    }).create({
      type: CategoryType.STREETFOOD,
    });
    await factory(Category)({
      restaurants: restaurants.slice(150, 200),
    }).create({
      type: CategoryType.VETERIAN,
    });
  }
}
