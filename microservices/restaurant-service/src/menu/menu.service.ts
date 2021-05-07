import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto, MenuDto } from './dto';
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuItemTopping,
  ToppingGroup,
} from './entities';
import {
  ICreateMenuResponse,
  IMenuInformationResponse,
  IMenuItemToppingResponse,
} from './interfaces';

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
    @InjectRepository(ToppingGroup)
    private toppingGroupRepository: Repository<ToppingGroup>,
  ) { }

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

  async getMenuItemToppingInfo(
    menuItemId: string,
  ): Promise<IMenuItemToppingResponse> {
    try {
      const toppingGroups = await this.toppingGroupRepository
        .createQueryBuilder('topG')
        .leftJoinAndSelect('topG.toppingItems', 'topI')
        .leftJoinAndSelect('topI.menuItemToppings', 'menuITop')
        .leftJoin('menuITop.menuItem', 'menuI')
        .where('menuI.id = :menuItemId', { menuItemId: menuItemId })
        .getMany();

      return {
        status: HttpStatus.OK,
        message: 'MenuItemToppings fetched successfully',
        toppingGroups,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        toppingGroups: null,
      };
    }
  }

  async create(dto: CreateMenuDto): Promise<ICreateMenuResponse> {
    const { merchantId, createMenuDto } = dto;
    const { isActive, name, restaurantId } = createMenuDto;

    const menu = this.menuRepository.create({ restaurantId, name, isActive });
    const newMenu = await this.menuRepository.save(menu);

    return {
      status: HttpStatus.CREATED,
      message: 'Menu was created',
      data: {
        menu: MenuDto.EntityToDto(newMenu)
      }
    };

  }
}
