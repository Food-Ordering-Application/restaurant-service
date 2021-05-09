import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateToppingItemDto, DeleteToppingItemDto, UpdateToppingItemDto } from './dto';
import { FetchToppingItemOfMenuDto } from './dto/fetch-topping-item-of-menu.dto';
import { ICreateToppingItemResponse, IDeleteToppingItemResponse, IFetchToppingItemOfMenuResponse, IUpdateToppingItemResponse } from './interfaces';
import { ToppingItemService } from './topping-item.service';

@Controller()
export class ToppingItemController {
  constructor(private readonly menuGroupService: ToppingItemService) { }

  @MessagePattern('createToppingItem')
  async create(@Payload() createToppingItemDto: CreateToppingItemDto): Promise<ICreateToppingItemResponse> {
    return await this.menuGroupService.create(createToppingItemDto);
  }

  @MessagePattern('fetchToppingItemOfMenu')
  async findAll(@Payload() fetchToppingItemDto: FetchToppingItemOfMenuDto): Promise<IFetchToppingItemOfMenuResponse> {
    return await this.menuGroupService.findAll(fetchToppingItemDto);
  }

  @MessagePattern('updateToppingItem')
  async update(@Payload() updateToppingItemDto: UpdateToppingItemDto): Promise<IUpdateToppingItemResponse> {
    return await this.menuGroupService.update(updateToppingItemDto);
  }

  @MessagePattern('deleteToppingItem')
  async delete(@Payload() deleteToppingItemDto: DeleteToppingItemDto): Promise<IDeleteToppingItemResponse> {
    return await this.menuGroupService.delete(deleteToppingItemDto);
  }
}
