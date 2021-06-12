import { Position } from './../../geo/types/position';
import * as fs from 'fs';
import * as path from 'path';
import { Connection, DeepPartial, QueryRunner } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuItemTopping,
  ToppingGroup,
  ToppingItem,
} from '../../menu/entities/index';
import {
  Category,
  OpenHour,
  Restaurant,
} from '../../restaurant/entities/index';
import { Area, City } from './../../geo/entities/';

const NUMBER_OF_RESETAURANTS = 1;
const NUMBER_OF_OPENHOURS = 7;

const NUMBER_OF_MENU_GROUP_PER_RESTAURANT = 3;
const NUMBER_OF_MENU_ITEM_PER_MENU_GROUP = 2;

const NUMBER_OF_TOPPING_GROUP_PER_RESTAURANT = 3;
const NUMBER_OF_TOPPING_ITEM_PER_TOPPING_GROUP = 3;

const createRestaurant = async (factory: Factory, restaurant: Restaurant) => {
  // Với mỗi nhà hàng tạo 7 openHour
  await factory(OpenHour)({ restaurantId: restaurant.id }).createMany(
    NUMBER_OF_OPENHOURS,
  );
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

  const [menuGroups, toppingGroups] = await Promise.all([
    menuGroupsPromise,
    toppingGroupsPromise,
  ]);

  // MenuItem & ToppingItem
  // Mỗi menuGroup tạo nhiều menuItem
  const menuItemsPromise = Promise.all(
    menuGroups.map((menuGroup) =>
      factory(MenuItem)({
        menu: menu,
        menuGroup: menuGroup,
      }).createMany(NUMBER_OF_MENU_ITEM_PER_MENU_GROUP),
    ),
  );

  // Mỗi toppingGroup tạo nhiều toppingItem
  const toppingItemsPromise = Promise.all(
    toppingGroups.map((toppingGroup) =>
      factory(ToppingItem)({
        menu: menu,
        toppingGroup: toppingGroup,
      }).createMany(NUMBER_OF_TOPPING_ITEM_PER_TOPPING_GROUP),
    ),
  );

  const [menuItems, toppingItems] = await Promise.all([
    menuItemsPromise,
    toppingItemsPromise,
  ]);

  const menuItemsArray = menuItems.reduce(
    (prev, menuItems) => prev.concat(menuItems),
    [],
  );
  const toppingItemsArray = toppingItems.reduce(
    (prev, toppingItems) => prev.concat(toppingItems),
    [],
  );

  // Tạo MenuItemTopping
  const menuItemToppings = menuItemsArray.reduce((prev, menuItem) => {
    const menuItemToppingOfCurrentItem = toppingItemsArray.map((toppingItem) =>
      factory(MenuItemTopping)({
        menuItem: menuItem,
        toppingItem: toppingItem,
      }).create(),
    );
    return [...prev, ...menuItemToppingOfCurrentItem];
  }, [] as Promise<MenuItemTopping>[]);
  await Promise.all(menuItemToppings);
};

export default class CreateFakeData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const queryRunner: QueryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await this.seedCategories(queryRunner);
    await this.seedCities(queryRunner);

    const restaurants = await factory(Restaurant)({}).createMany(
      NUMBER_OF_RESETAURANTS,
    );
    let position = 0;
    const batchSize = 20;
    let results = [];
    while (position < restaurants.length) {
      const itemsForBatch = restaurants.slice(position, position + batchSize);
      results = [
        ...results,
        ...(await Promise.all(
          itemsForBatch.map((item) => createRestaurant(factory, item)),
        )),
      ];
      position += batchSize;
    }
    await queryRunner.release();
  }

  async seedCities(queryRunner: QueryRunner) {
    type DistrictsJsonSchema = {
      id: string;
      name: string;
      latitude: number;
      longitude: number;
      isDefault: boolean;
    }[];

    type CitiesJsonSchema = Record<
      string,
      {
        name: string;
        latitude: number;
        longitude: number;
        districts: Record<string, string>;
      }
    >;
    const createCity = (data: DeepPartial<City>): City =>
      queryRunner.manager.create(City, data);
    const createArea = (data: DeepPartial<Area>): Area =>
      queryRunner.manager.create(Area, data);

    const getCitiesData = (): CitiesJsonSchema => {
      const seedJsonFileName = 'cities.json';
      const _path = `./${seedJsonFileName}`;
      const absolutePath = path.resolve(__dirname, _path);
      const response: CitiesJsonSchema = JSON.parse(
        fs.readFileSync(absolutePath, 'utf8'),
      );
      return response;
    };

    const getDistrictsData = (): DistrictsJsonSchema => {
      const seedJsonFileName = 'districts.json';
      const _path = `./${seedJsonFileName}`;
      const absolutePath = path.resolve(__dirname, _path);
      const response: DistrictsJsonSchema = JSON.parse(
        fs.readFileSync(absolutePath, 'utf8'),
      );
      return response;
    };

    const citiesData = getCitiesData();
    const districtsData = getDistrictsData();

    const cities: City[] = Object.entries(citiesData).map(
      ([id, { districts, name, latitude, longitude }]) => {
        const newDistricts: Area[] = Object.entries(districts).map(
          ([id, districtName]) => {
            const found = districtsData.find(
              (data) => data.id.toString() == id.toString(),
            );
            if (found) {
              const {
                isDefault,
                latitude: areaLatitude,
                longitude: areaLongitude,
              } = found;
              return createArea({
                id: parseInt(id),
                name: districtName,
                geometry: Position.PositionToGeometry({
                  longitude: areaLongitude,
                  latitude: areaLatitude,
                }),
                isPrecise: !isDefault,
              });
            }
            return createArea({
              id: parseInt(id),
              name: districtName,
              geometry: Position.PositionToGeometry({
                longitude: latitude,
                latitude: longitude,
              }),
              isPrecise: false,
            });
          },
        );

        return createCity({
          id: parseInt(id),
          name,
          districts: newDistricts,
          geometry: Position.PositionToGeometry({ latitude, longitude }),
        });
      },
    );

    return await queryRunner.manager.save(City, cities);
  }

  async seedCategories(queryRunner: QueryRunner) {
    type CategoryJsonSchema = {
      categories: {
        name: string;
        icon: {
          value: string;
        }[];
      }[];
    };

    const seedJsonFileName = 'categories.json';
    const _path = `./${seedJsonFileName}`;
    const absolutePath = path.resolve(__dirname, _path);
    const response: CategoryJsonSchema = JSON.parse(
      fs.readFileSync(absolutePath, 'utf8'),
    );
    const { categories } = response;
    const createCategory = (data: DeepPartial<Category>): Category =>
      queryRunner.manager.create(Category, data);

    const categoryEntities = categories.map((category) => {
      const { name, icon } = category;
      const iconUrl = icon[1].value;
      return createCategory({ name, iconUrl });
    });

    return await queryRunner.manager.save(Category, categoryEntities);
  }
}
