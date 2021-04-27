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
    const restaurants = await factory(Restaurant)({}).createMany(299);
    const res = await factory(Restaurant)({
      restaurantId: '007a5fc3-37ca-435b-bbdd-930ced6e4321',
    }).create();
    restaurants.push(res);
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
          menu: menu,
          menuGroup: menuGroups[0],
          menuItemId: '007a5fc3-37ca-435b-bbdd-930ced6e1234',
        }).create(),
        factory(MenuItem)({
          menu: menu,
          menuGroup: menuGroups[0],
        }).create(),
        factory(MenuItem)({
          menu: menu,
          menuGroup: menuGroups[1],
          menuItemId: '007a5fc3-37ca-435b-bbdd-930ced6e2314',
        }).create(),
        factory(MenuItem)({
          menu: menu,
          menuGroup: menuGroups[1],
        }).create(),
        factory(MenuItem)({
          menu: menu,
          menuGroup: menuGroups[2],
          menuItemId: '007a5fc3-37ca-435b-bbdd-930ced6e5142',
        }).create(),
        factory(MenuItem)({
          menu: menu,
          menuGroup: menuGroups[2],
        }).create(),
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
          menuItem: menuItems[0],
          toppingItem: toppingItems[0][0],
          menuItemToppingId: '007a5fc3-37ca-435b-bbdd-930ced6e3333',
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0],
          toppingItem: toppingItems[0][1],
          menuItemToppingId: '007a5fc3-37ca-435b-bbdd-930ced6e2315',
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0],
          toppingItem: toppingItems[0][2],
          menuItemToppingId: '007a5fc3-37ca-435b-bbdd-930ced6e6234',
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0],
          toppingItem: toppingItems[1][0],
          menuItemToppingId: '0090ee51-c1c3-4ddd-99c8-4e649ace1458',
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0],
          toppingItem: toppingItems[1][1],
          menuItemToppingId: '00c59b7f-99f5-4aa2-90ee-e350a5a0cd7f',
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0],
          toppingItem: toppingItems[1][2],
          menuItemToppingId: '00cac4af-3857-4559-b08c-cb2b2d4cfb99',
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0],
          toppingItem: toppingItems[2][0],
          menuItemToppingId: '00d85272-1a87-4abd-8c66-d87bd70eb032',
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0],
          toppingItem: toppingItems[2][1],
          menuItemToppingId: '00e83d12-f6f0-4c4f-8129-5ceb7ea182ba',
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[0],
          toppingItem: toppingItems[2][2],
          menuItemToppingId: '0120660b-a224-4d6b-a9bd-f2d23b2805b1',
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
          menuItem: menuItems[1],
          toppingItem: toppingItems[0][0],
          menuItemToppingId: '0120660b-a224-4d6b-a9bd-ffd23b2804b1',
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1],
          toppingItem: toppingItems[0][1],
          menuItemToppingId: '0120660b-a224-4d6b-a9bd-ffd23b2805b2',
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1],
          toppingItem: toppingItems[0][2],
          menuItemToppingId: '0120660b-a224-4d6b-a9bd-ffd23b2805b3',
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1],
          toppingItem: toppingItems[1][0],
          menuItemToppingId: '0120660b-a224-4d6b-a9bd-ffd23b2805b4',
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1],
          toppingItem: toppingItems[1][1],
          menuItemToppingId: '0120660b-a224-4d6b-a9bd-ffd23b2805b5',
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1],
          toppingItem: toppingItems[1][2],
          menuItemToppingId: '0120660b-a224-4d6b-a9bd-ffd23b2805b6',
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1],
          toppingItem: toppingItems[2][0],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1],
          toppingItem: toppingItems[2][1],
        }).create(),
        factory(MenuItemTopping)({
          menuItem: menuItems[1],
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
