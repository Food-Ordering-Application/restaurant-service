import { AdminJwtAuthGuard } from './../../auth/guards/jwts/admin-jwt-auth.guard';
import { Body, Controller, HttpCode, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { InternalServerErrorResponseDto } from "src/shared/dto/internal-server-error.dto";
import { AdminLocalAuthGuard } from './../../auth/guards/locals/admin-local-auth.guard';
import { AdminService } from "./admin.service";
import { LoginAdminResponseDto } from "./dto/login-admin/login-admin-response.dto";
import { LoginAdminUnauthorizedResponseDto } from "./dto/login-admin/login-admin-unauthorized-response.dto";
import { LoginAdminDto } from "./dto/login-admin/login-admin.dto";
import { VerifyRestaurantDto } from './dto/verify-restaurant/verify-restaurant.dto';

@ApiTags('admin')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/admin')
export class AdminController {

  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) { }

  // Đăng nhập Admin
  @ApiOkResponse({ type: LoginAdminResponseDto })
  @ApiUnauthorizedResponse({ type: LoginAdminUnauthorizedResponseDto })
  @ApiBody({ type: LoginAdminDto })
  @UseGuards(AdminLocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async loginAdmin(@Request() req): Promise<LoginAdminResponseDto> {
    return this.authService.adminLogin(req.user);
  }

  // @ApiOkResponse({ type: VerifyCustomerPhoneNumberResponseDto })
  // @ApiUnauthorizedResponse({
  //   type: VerifyCustomerPhoneNumberUnauthorizedResponseDto,
  // })
  @ApiBody({ type: VerifyRestaurantDto })
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AdminJwtAuthGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Customer))
  @Post('/verify-restaurant')
  async verifyRestaurant(
    @Body() verifyRestaurantDto: VerifyRestaurantDto,
  ) {
    return await this.adminService.verifyRestaurant(verifyRestaurantDto);
  }



}