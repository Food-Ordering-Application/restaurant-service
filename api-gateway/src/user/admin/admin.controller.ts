import { AdminJwtAuthGuard } from './../../auth/guards/jwts/admin-jwt-auth.guard';
import { Body, Controller, HttpCode, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { InternalServerErrorResponseDto } from "src/shared/dto/internal-server-error.dto";
import { AdminLocalAuthGuard } from './../../auth/guards/locals/admin-local-auth.guard';
import { AdminService } from "./admin.service";
import { LoginAdminDto, LoginAdminResponseDto, LoginAdminUnauthorizedResponseDto, VerifyRestaurantDto, VerifyRestaurantResponseDto, VerifyRestaurantUnauthorizedResponseDto } from './dto';

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

  @ApiOkResponse({ type: VerifyRestaurantResponseDto })
  @ApiUnauthorizedResponse({
    type: VerifyRestaurantUnauthorizedResponseDto,
  })
  @ApiBody({ type: VerifyRestaurantDto })
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AdminJwtAuthGuard)
  @Post('/verify-restaurant')
  async verifyRestaurant(
    @Body() verifyRestaurantDto: VerifyRestaurantDto,
  ) {
    return await this.adminService.verifyRestaurant(verifyRestaurantDto);
  }



}