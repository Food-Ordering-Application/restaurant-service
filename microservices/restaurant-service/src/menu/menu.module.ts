import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu, MenuGroup, MenuItem, MenuItemTopping } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu, MenuGroup, MenuItem, MenuItemTopping]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
