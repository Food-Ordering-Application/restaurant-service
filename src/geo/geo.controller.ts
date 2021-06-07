import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetCityDto, GetDistrictsDto } from './dto';
import { GeoService } from './geo.service';
import { IGetCityResponse, IGetDistrictsResponse } from './interfaces';

@Controller()
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @MessagePattern('getDistrictsOfCity')
  async getDistrictsOfCity(
    @Payload() getDistrictsOfCityDto: GetDistrictsDto,
  ): Promise<IGetDistrictsResponse> {
    return await this.geoService.getDistrictsOfCity(getDistrictsOfCityDto);
  }

  @MessagePattern('getCityFromLocation')
  async getCityFromLocation(
    @Payload() getCityFromLocationDto: GetCityDto,
  ): Promise<IGetCityResponse> {
    return await this.geoService.getCityFromLocation(getCityFromLocationDto);
  }
}
