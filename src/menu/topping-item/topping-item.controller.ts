import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateToppingItemDto,
  DeleteToppingItemDto,
  FetchMenuItemToppingsOfCurrentToppingItemDto,
  GetToppingItemDetailDto,
  UpdateMenuItemToppingsOfCurrentToppingItemDto,
  UpdateToppingItemDto,
} from './dto';
import { FetchToppingItemOfMenuDto } from './dto/fetch-topping-item-of-menu.dto';
import {
  ICreateToppingItemResponse,
  IDeleteToppingItemResponse,
  IFetchMenuItemToppingsOfCurrentToppingItemResponse,
  IFetchToppingItemOfMenuResponse,
  IGetToppingItemDetailResponse,
  IUpdateMenuItemToppingsOfCurrentToppingItemResponse,
  IUpdateToppingItemResponse,
} from './interfaces';
import { ToppingItemService } from './topping-item.service';

@Controller()
export class ToppingItemController {
  constructor(private readonly menuGroupService: ToppingItemService) {}

  @MessagePattern('createToppingItem')
  async create(
    @Payload() createToppingItemDto: CreateToppingItemDto,
  ): Promise<ICreateToppingItemResponse> {
    return await this.menuGroupService.create(createToppingItemDto);
  }

  @MessagePattern('fetchToppingItemOfMenu')
  async findAll(
    @Payload() fetchToppingItemDto: FetchToppingItemOfMenuDto,
  ): Promise<IFetchToppingItemOfMenuResponse> {
    return await this.menuGroupService.findAll(fetchToppingItemDto);
  }

  @MessagePattern('updateToppingItem')
  async update(
    @Payload() updateToppingItemDto: UpdateToppingItemDto,
  ): Promise<IUpdateToppingItemResponse> {
    return await this.menuGroupService.update(updateToppingItemDto);
  }

  @MessagePattern('getToppingItemDetail')
  async getToppingItemDetail(
    @Payload() getToppingItemDetailDto: GetToppingItemDetailDto,
  ): Promise<IGetToppingItemDetailResponse> {
    return await this.menuGroupService.getToppingItemDetail(
      getToppingItemDetailDto,
    );
  }

  @MessagePattern('fetchMenuItemToppingsOfCurrentToppingItem')
  async fetchMenuItemTopping(
    @Payload()
    fetchMenuItemToppingDto: FetchMenuItemToppingsOfCurrentToppingItemDto,
  ): Promise<IFetchMenuItemToppingsOfCurrentToppingItemResponse> {
    return await this.menuGroupService.fetchMenuItemTopping(
      fetchMenuItemToppingDto,
    );
  }

  @MessagePattern('updateMenuItemToppingsOfCurrentToppingItem')
  async updateMenuItemTopping(
    @Payload()
    updateMenuItemToppingDto: UpdateMenuItemToppingsOfCurrentToppingItemDto,
  ): Promise<IUpdateMenuItemToppingsOfCurrentToppingItemResponse> {
    return await this.menuGroupService.updateMenuItemTopping(
      updateMenuItemToppingDto,
    );
  }

  @MessagePattern('deleteToppingItem')
  async delete(
    @Payload() deleteToppingItemDto: DeleteToppingItemDto,
  ): Promise<IDeleteToppingItemResponse> {
    return await this.menuGroupService.delete(deleteToppingItemDto);
  }
}
