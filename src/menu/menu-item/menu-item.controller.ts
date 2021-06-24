import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateMenuItemDto,
  DeleteMenuItemDto,
  GetMenuItemInfosDto,
  UpdateMenuItemDto,
} from './dto';
import { FetchMenuItemOfMenuDto } from './dto/fetch-menu-item-of-menu.dto';
import {
  ICreateMenuItemResponse,
  IDeleteMenuItemResponse,
  IFetchMenuItemOfMenuResponse,
  IGetMenuItemInfosResponse,
  IUpdateMenuItemResponse,
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
}
