import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetAllCitiesDto, GetCityDto, GetDistrictsDto } from './dto';
import { GeoService } from './geo.service';
import {
  IGetCitiesResponse,
  IGetCityResponse,
  IGetDistrictsResponse,
} from './interfaces';

@Controller()
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @MessagePattern('getAllCities')
  async getAllCities(
    @Payload() getAllCitiesDto: GetAllCitiesDto,
  ): Promise<IGetCitiesResponse> {
    return await this.geoService.getAllCities(getAllCitiesDto);
  }

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
