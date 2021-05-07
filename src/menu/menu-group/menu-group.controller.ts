import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMenuGroupDto } from './dto';
import { FetchMenuGroupOfMenuDto } from './dto/fetch-menu-group-of-menu.dto';
import { ICreateMenuGroupResponse, IFetchMenuGroupOfMenuResponse } from './interfaces';
import { MenuGroupService } from './menu-group.service';

@Controller()
export class MenuGroupController {
  constructor(private readonly menuGroupService: MenuGroupService) { }

  @MessagePattern('createMenuGroup')
  async create(@Payload() createMenuGroupDto: CreateMenuGroupDto): Promise<ICreateMenuGroupResponse> {
    return await this.menuGroupService.create(createMenuGroupDto);
  }

  @MessagePattern('fetchMenuGroupOfMenu')
  async findAll(@Payload() fetchMenuGroupDto: FetchMenuGroupOfMenuDto): Promise<IFetchMenuGroupOfMenuResponse> {
    return await this.menuGroupService.findAll(fetchMenuGroupDto);
  }

  // @MessagePattern('updateMenuGroup')
  // async update(@Payload() updateMenuGroupDto: UpdateMenuGroupDto): Promise<IMenuGroupServiceResponse> {
  //   return await this.menuGroupService.update(updateMenuGroupDto);
  // }

  // @MessagePattern('deleteMenuGroup')
  // async delete(@Payload() deleteMenuGroupDto: DeleteMenuGroupDto): Promise<IMenuGroupServiceResponse> {
  //   return await this.menuGroupService.delete(deleteMenuGroupDto);
  // }
}
