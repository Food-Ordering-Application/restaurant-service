import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu, MenuGroup, MenuItem, ToppingGroup } from './entities';
import { MenuGroupService } from './menu-group/menu-group.service';
import { MenuGroupController } from './menu-group/menu-group.controller';
import { MenuItemService } from './menu-item/menu-item.service';
import { MenuItemController } from './menu-item/menu-item.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu, MenuGroup, MenuItem, ToppingGroup]),
  ],
  controllers: [MenuController, MenuGroupController, MenuItemController],
  providers: [MenuService, MenuGroupService, MenuItemService],
})
export class MenuModule { }
