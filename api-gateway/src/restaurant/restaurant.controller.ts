import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { MerchantJwtAuthGuard } from 'src/auth/guards/jwts/merchant-jwt-auth.guard';
import { MerchantJwtPayload } from './../auth/strategies/jwt-strategies/merchant-jwt-payload.interface';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@ApiTags('restaurants')
@ApiInternalServerErrorResponse({ type: ApiInternalServerErrorResponse })
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  // TODO
  // @ApiCreatedResponse({ type: CreateMerchantResponseDto })
  // @ApiConflictResponse({ type: CreateMerchantConflictResponseDto })
  @ApiBody({ type: CreateRestaurantDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Post()
  createRestaurant(@Req() req, @Payload() createRestaurantDto: CreateRestaurantDto) {
    const merchantPayload: MerchantJwtPayload = req.user;
    const { merchantId } = merchantPayload;
    return this.restaurantService.createRestaurant(merchantId, createRestaurantDto);
  }

  // @MessagePattern('findAllRestaurant')
  // findAll() {
  //   return this.restaurantService.findAll();
  // }

  // @MessagePattern('findOneRestaurant')
  // findOne(@Payload() id: number) {
  //   return this.restaurantService.findOne(id);
  // }

  // @MessagePattern('updateRestaurant')
  // update(@Payload() updateRestaurantDto: UpdateRestaurantDto) {
  //   return this.restaurantService.update(updateRestaurantDto.id, updateRestaurantDto);
  // }

  // @MessagePattern('removeRestaurant')
  // remove(@Payload() id: number) {
  //   return this.restaurantService.remove(id);
  // }
}
