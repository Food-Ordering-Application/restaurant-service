import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu, MenuGroup, MenuItem } from './entities';
import { IMenuInformationResponse } from './interfaces';

@Injectable()
export class MenuService {
  private readonly logger = new Logger('MenuService');

  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(MenuGroup)
    private menuGroupRepository: Repository<MenuGroup>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}

  async getMenuInformation(
    restaurantId: string,
  ): Promise<IMenuInformationResponse> {
    try {
      const menu = await this.menuRepository
        .createQueryBuilder('menu')
        .leftJoin('menu.restaurant', 'restaurant')
        .where('restaurant.id = :restaurantId', { restaurantId: restaurantId })
        .getOne();

      const menuGroups = await this.menuGroupRepository
        .createQueryBuilder('menuG')
        .leftJoin('menuG.menu', 'menu')
        .leftJoinAndSelect('menuG.menuItems', 'menuI')
        .where('menu.id = :menuId', { menuId: menu.id })
        .getMany();

      return {
        status: HttpStatus.OK,
        message: 'Restaurant fetched successfully',
        menu: menu,
        menuGroups: menuGroups,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        menu: null,
        menuGroups: null,
      };
    }
  }
}
