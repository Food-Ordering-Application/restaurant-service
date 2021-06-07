import { HttpStatus, Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityDto, GetDistrictsDto } from './dto';
import { Area, City } from './entities';
import { IGetDistrictsResponse } from './interfaces';

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
}
