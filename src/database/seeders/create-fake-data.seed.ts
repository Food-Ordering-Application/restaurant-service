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

const NUMBER_OF_RESETAURANTS = 50;
const NUMBER_OF_OPENHOURS = 7;

const NUMBER_OF_MENU_GROUP_PER_RESTAURANT = 3;
const NUMBER_OF_MENU_ITEM_PER_MENU_GROUP = 2;

const NUMBER_OF_TOPPING_GROUP_PER_RESTAURANT = 3;
const NUMBER_OF_TOPPING_ITEM_PER_TOPPING_GROUP = 3;

const createRestaurant = async (factory: Factory, restaurant: Restaurant) => {
  // Với mỗi nhà hàng tạo 7 openHour
  await factory(OpenHour)({ restaurantId: restaurant.id }).createMany(NUMBER_OF_OPENHOURS);
  // Menu
  // Với mỗi nhà hàng tạo 1 menu
  const menu = await factory(Menu)({
    restaurantId: restaurant.id,
  }).create();

  // MenuGroup & ToppingGroup
  // Với mỗi menu tạo 3 menuGroup
  const menuGroupsPromise = factory(MenuGroup)({
    menuId: menu.id,
  }).createMany(NUMBER_OF_MENU_GROUP_PER_RESTAURANT);
  // Với mỗi menu tạo 3 toppingGroup
  const toppingGroupsPromise = factory(ToppingGroup)({
    menuId: menu.id,
  }).createMany(NUMBER_OF_TOPPING_GROUP_PER_RESTAURANT);

  const [menuGroups, toppingGroups] = await Promise.all([menuGroupsPromise, toppingGroupsPromise]);

  // MenuItem & ToppingItem
  // Mỗi menuGroup tạo nhiều menuItem
  const menuItemsPromise = Promise.all(menuGroups.map((menuGroup) =>
    factory(MenuItem)({
      menu: menu,
      menuGroup: menuGroup,
    }).createMany(NUMBER_OF_MENU_ITEM_PER_MENU_GROUP)));

  // Mỗi toppingGroup tạo nhiều toppingItem
  const toppingItemsPromise = Promise.all(toppingGroups.map((toppingGroup) =>
    factory(ToppingItem)({
      menu: menu,
      toppingGroup: toppingGroup,
    }).createMany(NUMBER_OF_TOPPING_ITEM_PER_TOPPING_GROUP)));

  const [menuItems, toppingItems] = await Promise.all([menuItemsPromise, toppingItemsPromise]);

  const menuItemsArray = menuItems.reduce((prev, menuItems) => prev.concat(menuItems), []);
  const toppingItemsArray = toppingItems.reduce((prev, toppingItems) => prev.concat(toppingItems), []);

  // Tạo MenuItemTopping
  const menuItemToppings = menuItemsArray.reduce((prev, menuItem) => {
    const menuItemToppingOfCurrentItem = toppingItemsArray.map(toppingItem =>
      factory(MenuItemTopping)({
        menuItem: menuItem,
        toppingItem: toppingItem,
      }).create());
    return [...prev, ...menuItemToppingOfCurrentItem];
  }, [] as Promise<MenuItemTopping>[]);
  await Promise.all(menuItemToppings);
}

export default class CreateFakeData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const restaurants = await factory(Restaurant)({}).createMany(NUMBER_OF_RESETAURANTS);
    let position = 0;
    const batchSize = 20;
    let results = [];
    while (position < restaurants.length) {
      const itemsForBatch = restaurants.slice(position, position + batchSize);
      results = [...results, ...await Promise.all(itemsForBatch.map(item => createRestaurant(factory, item)))];
      position += batchSize;
    }
  }
}

