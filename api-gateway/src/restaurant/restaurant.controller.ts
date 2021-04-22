import {
  Controller,
  Get,
  Body,
  Logger,
  Post,
  HttpCode,
  Param,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import {
  GetRestaurantInformationResponseDto,
  GetSomeRestaurantResponseDto,
} from './dto/index';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from 'src/shared/dto/internal-server-error.dto';
import { GetSomeRestaurantDto } from './dto/get-some-restaurant.dto';

@ApiTags('restaurants')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('restaurant')
export class RestaurantController {
  private logger = new Logger('CustomerController');

  constructor(private readonly restaurantService: RestaurantService) {}

  // Danh sách 25 nhà hàng
  // Có thể lọc theo loại StreetFood,CafeDessert,Restaurant,Veterian
  // Chắc chắn lọc theo area
  @ApiOkResponse({ type: GetSomeRestaurantResponseDto })
  @HttpCode(200)
  @Post('/some-restaurant')
  getSomeRestaurant(
    @Body() getSomeRestaurantDto: GetSomeRestaurantDto,
  ): Promise<GetSomeRestaurantResponseDto> {
    return this.restaurantService.getSomeRestaurant(getSomeRestaurantDto);
  }

  // Lấy thông tin chi tiết 1 nhà hàng
  @ApiOkResponse({ type: GetSomeRestaurantResponseDto })
  @Get('/:restaurantId')
  getRestaurantInformation(
    @Param() params,
  ): Promise<GetRestaurantInformationResponseDto> {
    const { restaurantId } = params;
    return this.restaurantService.getRestaurantInformation(restaurantId);
  }
}
