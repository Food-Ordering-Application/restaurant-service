import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetMenuInformationDto, GetMenuItemToppingDto } from './dto';
import {
  IMenuInformationResponse,
  IMenuItemToppingResponse,
} from './interfaces';
import { MenuService } from './menu.service';

@Controller()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

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
