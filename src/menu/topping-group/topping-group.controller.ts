import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateToppingGroupDto, DeleteToppingGroupDto, UpdateToppingGroupDto } from './dto';
import { FetchToppingGroupOfMenuDto } from './dto/fetch-topping-group-of-menu.dto';
import { ICreateToppingGroupResponse, IDeleteToppingGroupResponse, IFetchToppingGroupOfMenuResponse, IUpdateToppingGroupResponse } from './interfaces';
import { ToppingGroupService } from './topping-group.service';

@Controller()
export class ToppingGroupController {
  constructor(private readonly toppingGroupService: ToppingGroupService) { }

  @MessagePattern('createToppingGroup')
  async create(@Payload() createToppingGroupDto: CreateToppingGroupDto): Promise<ICreateToppingGroupResponse> {
    return await this.toppingGroupService.create(createToppingGroupDto);
  }

  @MessagePattern('fetchToppingGroupOfMenu')
  async findAll(@Payload() fetchToppingGroupDto: FetchToppingGroupOfMenuDto): Promise<IFetchToppingGroupOfMenuResponse> {
    return await this.toppingGroupService.findAll(fetchToppingGroupDto);
  }

  @MessagePattern('updateToppingGroup')
  async update(@Payload() updateToppingGroupDto: UpdateToppingGroupDto): Promise<IUpdateToppingGroupResponse> {
    return await this.toppingGroupService.update(updateToppingGroupDto);
  }

  @MessagePattern('deleteToppingGroup')
  async delete(@Payload() deleteToppingGroupDto: DeleteToppingGroupDto): Promise<IDeleteToppingGroupResponse> {
    return await this.toppingGroupService.delete(deleteToppingGroupDto);
  }
}
