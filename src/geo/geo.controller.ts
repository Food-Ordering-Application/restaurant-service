import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GeoService } from './geo.service';

@Controller()
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  // @MessagePattern('createMenu')
  // async createMenu(
  //   @Payload() createMenuDto: CreateMenuDto,
  // ): Promise<ICreateMenuResponse> {
  //   return await this.menuService.create(createMenuDto);
  // }
}
