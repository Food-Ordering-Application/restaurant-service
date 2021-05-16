import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FetchMenuItemToppingsOfMenuDto } from './dto';
import { IFetchMenuItemToppingsOfMenuResponse } from './interfaces';
import { MenuItemToppingService } from './menu-item-topping.service';

@Controller()
export class MenuItemToppingController {
  constructor(
    private readonly menuItemToppingService: MenuItemToppingService,
  ) {}

  @MessagePattern('fetchMenuItemToppingOfMenu')
  async findAll(
    @Payload() fetchMenuItemToppingsOfMenuDto: FetchMenuItemToppingsOfMenuDto,
  ): Promise<IFetchMenuItemToppingsOfMenuResponse> {
    return await this.menuItemToppingService.findAll(
      fetchMenuItemToppingsOfMenuDto,
    );
  }
}
