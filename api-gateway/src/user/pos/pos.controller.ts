import { PosService } from './pos.service';
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from 'src/shared/dto/internal-server-error.dto';
import { VerifyAppKeyDto, VerifyAppKeyResponseDto, VerifyAppKeyUnauthorizedResponseDto } from './dto';

@ApiTags('pos')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/pos')
export class PosController {

  constructor(
    private posService: PosService
  ) { }

  // // Đăng nhập Pos
  // @ApiOkResponse({ type: LoginPosResponseDto })
  // @ApiUnauthorizedResponse({ type: LoginPosUnauthorizedResponseDto })
  // @ApiBody({ type: LoginPosDto })
  // @UseGuards(PosLocalAuthGuard)
  // @HttpCode(200)
  // @Post('/login')
  // async loginPos(@Request() req, @Body() LoginPosDto: LoginPosDto): Promise<LoginPosResponseDto> {
  //   return this.authService.posLogin(req.user);
  // }

  @ApiOkResponse({ type: VerifyAppKeyResponseDto })
  @ApiUnauthorizedResponse({
    type: VerifyAppKeyUnauthorizedResponseDto,
  })
  @ApiBody({ type: VerifyAppKeyDto })
  @HttpCode(200)
  @Post('/verify-app-key')
  async verifyPos(
    @Body() verifyAppKeyDto: VerifyAppKeyDto,
  ): Promise<VerifyAppKeyResponseDto> {
    return await this.posService.verifyAppKey(verifyAppKeyDto);
  }
}