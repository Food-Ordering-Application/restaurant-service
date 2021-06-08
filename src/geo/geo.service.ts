import { HttpStatus, Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityDto, GetAllCitiesDto, GetCityDto, GetDistrictsDto } from './dto';
import { Area, City } from './entities';
import {
  IGetCitiesResponse,
  IGetCityResponse,
  IGetDistrictsResponse,
} from './interfaces';

@Injectable()
export class GeoService {
  constructor(
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async validCityAndArea(cityId: number, areaId: number): Promise<boolean> {
    const count = await this.areaRepository.count({
      id: areaId,
      cityId: cityId,
    });
    return count !== 0;
  }

  async getDistrictsOfCity(
    getDistrictsOfCityDto: GetDistrictsDto,
  ): Promise<IGetDistrictsResponse> {
    const { cityId } = getDistrictsOfCityDto;
    const queryBuilder = this.cityRepository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.districts', 'districts')
      .where('city.id = :cityId', { cityId: cityId })
      .select(['city.id', 'city.name', 'districts.id', 'districts.name']);
    const city = await queryBuilder.getOne();
    if (!city) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'City not found',
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Fetched districts of city successfully',
      data: {
        city: CityDto.EntityToDto(city),
      },
    };
  }

  async getCityFromLocation(
    getCityFromLocationDto: GetCityDto,
  ): Promise<IGetCityResponse> {
    const { position } = getCityFromLocationDto;
    const { latitude, longitude } = position;

    // raw query
    //  select c."name", a."name",
    // 	ST_Distance_Sphere(a.geometry, 'SRID=4326;POINT(106.97015310738546 11.086332346448264)') AS dist
    //  from area a
    //    join city c
    //    on a."cityId" = c.id
    //  order by a.geometry <-> 'SRID=4326;POINT(106.97015310738546 11.086332346448264)'
    //  limit 1;

    const queryBuilder = this.areaRepository
      .createQueryBuilder('area')
      .leftJoinAndSelect('area.city', 'city')
      .orderBy(`area.geometry <-> 'SRID=4326;POINT(${longitude} ${latitude})'`)
      .select(['city.id', 'city.name'])
      .take(1);

    const area = await queryBuilder.getOne();
    return {
      status: HttpStatus.OK,
      message: 'Get city from location successfully',
      data: {
        city: CityDto.EntityToDto(area.city),
      },
    };
  }

  async getAllCities(
    getAllCitiesDto: GetAllCitiesDto,
  ): Promise<IGetCitiesResponse> {
    const response = await this.cityRepository.find();
    const cities = response.map(CityDto.EntityToDto);

    return {
      status: HttpStatus.OK,
      message: 'Fetched districts of city successfully',
      data: {
        cities: cities,
      },
    };
  }
}
