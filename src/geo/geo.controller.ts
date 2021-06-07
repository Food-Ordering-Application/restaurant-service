import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetDistrictsDto } from './dto';
import { GeoService } from './geo.service';
import { IGetDistrictsResponse } from './interfaces';

@Controller()
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @MessagePattern('getDistrictsOfCity')
  async getDistrictsOfCity(
    @Payload() getDistrictsOfCityDto: GetDistrictsDto,
  ): Promise<IGetDistrictsResponse> {
    return await this.geoService.getDistrictsOfCity(getDistrictsOfCityDto);
  }
}
