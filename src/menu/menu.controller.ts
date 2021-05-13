import { ICreateMenuResponse } from './interfaces/create-menu-response.interface';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateMenuDto,
  FetchMenuGroupsAndItemsDto,
  FetchMenuOfRestaurantDto,
  GetMenuInformationDto,
  GetMenuItemToppingDto,
  UpdateMenuDto,
} from './dto';
import {
  IFetchMenuGroupsAndItemsResponse,
  IFetchMenuOfRestaurantResponse,
  IMenuInformationResponse,
  IMenuItemToppingResponse,
  IUpdateMenuResponse,
} from './interfaces';
import { MenuService } from './menu.service';

@Controller()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @MessagePattern('createMenu')
  async createMenu(
    @Payload() createMenuDto: CreateMenuDto,
  ): Promise<ICreateMenuResponse> {
    return await this.menuService.create(createMenuDto);
  }

  @MessagePattern('fetchMenuOfRestaurant')
  async fetchMenuOfRestaurant(
    @Payload() fetchMenuOfRestaurantDto: FetchMenuOfRestaurantDto,
  ): Promise<IFetchMenuOfRestaurantResponse> {
    return await this.menuService.fetchMenuOfRestaurant(
      fetchMenuOfRestaurantDto,
    );
  }

  @MessagePattern('fetchMenuGroupsAndItems')
  async fetchMenuGroupsAndItems(
    @Payload() fetchMenuGroupsAndItemsDto: FetchMenuGroupsAndItemsDto,
  ): Promise<IFetchMenuGroupsAndItemsResponse> {
    return await this.menuService.fetchMenuGroupsAndItems(
      fetchMenuGroupsAndItemsDto,
    );
  }

  @MessagePattern('updateMenu')
  async update(
    @Payload() updateMenuDto: UpdateMenuDto,
  ): Promise<IUpdateMenuResponse> {
    return await this.menuService.update(updateMenuDto);
  }

  @MessagePattern('getMenuInformation')
  getMenuInformation(
    @Payload() getMenuInformationDto: GetMenuInformationDto,
  ): Promise<IMenuInformationResponse> {
    const { restaurantId } = getMenuInformationDto;
    return this.menuService.getMenuInformation(restaurantId);
  }

  @MessagePattern('getMenuItemToppingInfo')
  getMenuItemToppingInfo(
    @Payload() getMenuItemToppingDto: GetMenuItemToppingDto,
  ): Promise<IMenuItemToppingResponse> {
    const { menuItemId } = getMenuItemToppingDto;
    return this.menuService.getMenuItemToppingInfo(menuItemId);
  }
}
