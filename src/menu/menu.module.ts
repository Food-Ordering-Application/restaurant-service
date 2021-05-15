import { MenuItemToppingService } from './menu-item-topping/menu-item-topping.service';
import { MenuItemToppingController } from './menu-item-topping/menu-item-topping.controller';
import { RestaurantModule } from './../restaurant/restaurant.module';
import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuItemTopping,
  ToppingGroup,
  ToppingItem,
} from './entities';
import { MenuGroupService } from './menu-group/menu-group.service';
import { MenuGroupController } from './menu-group/menu-group.controller';
import { MenuItemService } from './menu-item/menu-item.service';
import { MenuItemController } from './menu-item/menu-item.controller';
import { ToppingGroupController } from './topping-group/topping-group.controller';
import { ToppingGroupService } from './topping-group/topping-group.service';
import { ToppingItemController } from './topping-item/topping-item.controller';
import { ToppingItemService } from './topping-item/topping-item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Menu,
      MenuGroup,
      MenuItem,
      ToppingGroup,
      ToppingItem,
      MenuItemTopping,
    ]),
    RestaurantModule,
  ],
  controllers: [
    MenuController,
    MenuGroupController,
    MenuItemController,
    ToppingGroupController,
    ToppingItemController,
    MenuItemToppingController,
  ],
  providers: [
    MenuService,
    MenuGroupService,
    MenuItemService,
    ToppingGroupService,
    ToppingItemService,
    MenuItemToppingService,
  ],
})
export class MenuModule {}
