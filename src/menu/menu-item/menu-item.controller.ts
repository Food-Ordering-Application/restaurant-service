import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMenuItemDto, DeleteMenuItemDto, UpdateMenuItemDto } from './dto';
import { FetchMenuItemOfMenuDto } from './dto/fetch-menu-item-of-menu.dto';
import { ICreateMenuItemResponse, IDeleteMenuItemResponse, IFetchMenuItemOfMenuResponse, IUpdateMenuItemResponse } from './interfaces';
import { MenuItemService } from './menu-item.service';

@Controller()
export class MenuItemController {
  constructor(private readonly menuGroupService: MenuItemService) { }

  @MessagePattern('createMenuItem')
  async create(@Payload() createMenuItemDto: CreateMenuItemDto): Promise<ICreateMenuItemResponse> {
    return await this.menuGroupService.create(createMenuItemDto);
  }

  @MessagePattern('fetchMenuItemOfMenu')
  async findAll(@Payload() fetchMenuItemDto: FetchMenuItemOfMenuDto): Promise<IFetchMenuItemOfMenuResponse> {
    return await this.menuGroupService.findAll(fetchMenuItemDto);
  }

  @MessagePattern('updateMenuItem')
  async update(@Payload() updateMenuItemDto: UpdateMenuItemDto): Promise<IUpdateMenuItemResponse> {
    return await this.menuGroupService.update(updateMenuItemDto);
  }

  @MessagePattern('deleteMenuItem')
  async delete(@Payload() deleteMenuItemDto: DeleteMenuItemDto): Promise<IDeleteMenuItemResponse> {
    return await this.menuGroupService.delete(deleteMenuItemDto);
  }
}
