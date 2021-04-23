
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiBody, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { InternalServerErrorResponseDto } from "src/shared/dto/internal-server-error.dto";
import { AdminService } from "./admin.service";
import { VerifyRestaurantDto } from './dto/verify-restaurant/verify-restaurant.dto';

@ApiTags('admin')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/admin')
export class AdminController {

  constructor(
    private adminService: AdminService
  ) { }

  // @ApiOkResponse({ type: VerifyCustomerPhoneNumberResponseDto })
  // @ApiUnauthorizedResponse({
  //   type: VerifyCustomerPhoneNumberUnauthorizedResponseDto,
  // })
  @ApiBody({ type: VerifyRestaurantDto })
  // @ApiBearerAuth()
  @HttpCode(200)
  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Customer))
  @Post('/verify-restaurant')
  async verifyRestaurant(
    @Body() verifyRestaurantDto: VerifyRestaurantDto,
  ) {
    return await this.adminService.verifyRestaurant(verifyRestaurantDto);
  }
}