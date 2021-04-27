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
  GetMenuInformationResponseDto,
  GetRestaurantInformationResponseDto,
  GetSomeRestaurantResponseDto,
  GetMenuItemToppingInfoResponseDto,
  GetMenuItemToppingDto,
  GetSomeRestaurantDto,
} from './dto/index';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from 'src/shared/dto/internal-server-error.dto';

@ApiTags('restaurants')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('restaurant')
export class RestaurantController {
  private logger = new Logger('RestaurantController');

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
  @ApiOkResponse({ type: GetRestaurantInformationResponseDto })
  @Get('/:restaurantId')
  getRestaurantInformation(
    @Param() params,
  ): Promise<GetRestaurantInformationResponseDto> {
    const { restaurantId } = params;
    return this.restaurantService.getRestaurantInformation(restaurantId);
  }

  // Lấy thông tin về Menu, MenuGroup, MenuItems của nhà hàng
  @ApiOkResponse({ type: GetMenuInformationResponseDto })
  @Get('/:restaurantId/get-menu-information')
  getMenuInformation(@Param() params): Promise<GetMenuInformationResponseDto> {
    const { restaurantId } = params;
    return this.restaurantService.getMenuInformation(restaurantId);
  }

  // Lấy thông tin về MenuItemTopping, ToppingGroup của 1 MenuItem
  @ApiOkResponse({ type: GetMenuItemToppingInfoResponseDto })
  @ApiBody({ type: GetMenuItemToppingDto })
  @HttpCode(200)
  @Post('/get-menu-item-topping-info')
  getMenuItemToppingInfo(
    @Body() getMenuItemToppingDto: GetMenuItemToppingDto,
  ): Promise<GetMenuItemToppingInfoResponseDto> {
    return this.restaurantService.getMenuItemToppingInfo(
      getMenuItemToppingDto.menuItemId,
    );
  }
}
