import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateMenuItemDto,
  DeleteMenuItemDto,
  GetMenuItemDetailDto,
  GetMenuItemInfosDto,
  GetMenuItemToppingsOfCurrentMenuItemDto,
  UpdateMenuItemDto,
  UpdateMenuItemToppingsOfCurrentMenuItemDto,
} from './dto';
import { FetchMenuItemOfMenuDto } from './dto/fetch-menu-item-of-menu.dto';
import {
  ICreateMenuItemResponse,
  IDeleteMenuItemResponse,
  IFetchMenuItemOfMenuResponse,
  IGetMenuItemDetailResponse,
  IGetMenuItemInfosResponse,
  IGetMenuItemToppingsOfCurrentMenuItemResponse,
  IUpdateMenuItemResponse,
  IUpdateMenuItemToppingsOfCurrentMenuItemResponse,
} from './interfaces';
import { MenuItemService } from './menu-item.service';

@Controller()
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @MessagePattern('createMenuItem')
  async create(
    @Payload() createMenuItemDto: CreateMenuItemDto,
  ): Promise<ICreateMenuItemResponse> {
    return await this.menuItemService.create(createMenuItemDto);
  }

  @MessagePattern('fetchMenuItemOfMenu')
  async findAll(
    @Payload() fetchMenuItemDto: FetchMenuItemOfMenuDto,
  ): Promise<IFetchMenuItemOfMenuResponse> {
    return await this.menuItemService.findAll(fetchMenuItemDto);
  }

  @MessagePattern('getMenuItemDetail')
  async getMenuItemDetail(
    @Payload() getMenuItemDetailDto: GetMenuItemDetailDto,
  ): Promise<IGetMenuItemDetailResponse> {
    return await this.menuItemService.getMenuItemDetail(getMenuItemDetailDto);
  }

  @MessagePattern('updateMenuItem')
  async update(
    @Payload() updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<IUpdateMenuItemResponse> {
    return await this.menuItemService.update(updateMenuItemDto);
  }

  @MessagePattern('deleteMenuItem')
  async delete(
    @Payload() deleteMenuItemDto: DeleteMenuItemDto,
  ): Promise<IDeleteMenuItemResponse> {
    return await this.menuItemService.delete(deleteMenuItemDto);
  }

  @MessagePattern('getMenuItemInfos')
  async getMenuItemInfos(
    @Payload() getMenuItemInfosDto: GetMenuItemInfosDto,
  ): Promise<IGetMenuItemInfosResponse> {
    return await this.menuItemService.getMenuItemInfos(getMenuItemInfosDto);
  }

  @MessagePattern('fetchMenuItemToppingsOfCurrentMenuItem')
  async fetchMenuItemTopping(
    @Payload()
    getMenuItemToppingsOfCurrentMenuItemDto: GetMenuItemToppingsOfCurrentMenuItemDto,
  ): Promise<IGetMenuItemToppingsOfCurrentMenuItemResponse> {
    return await this.menuItemService.fetchMenuItemTopping(
      getMenuItemToppingsOfCurrentMenuItemDto,
    );
  }

  @MessagePattern('updateMenuItemToppingsOfCurrentMenuItem')
  async updateMenuItemTopping(
    @Payload()
    updateMenuItemToppingsOfCurrentMenuItemDto: UpdateMenuItemToppingsOfCurrentMenuItemDto,
  ): Promise<IUpdateMenuItemToppingsOfCurrentMenuItemResponse> {
    return await this.menuItemService.updateMenuItemTopping(
      updateMenuItemToppingsOfCurrentMenuItemDto,
    );
  }
}
