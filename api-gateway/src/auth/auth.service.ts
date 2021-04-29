import { IStaffLogin } from '../user/pos/interfaces/index';
import { LoginPosResponseDto } from './../user/pos/dto/login-pos/login-pos-response.dto';
import { PosService } from './../user/pos/pos.service';
import { IMerchant } from './../user/merchant/interfaces/merchant.interface';
import { MerchantService } from '../user/merchant/merchant.service';
import { Injectable, Logger } from '@nestjs/common';
import { CustomerService } from '../user/customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MerchantJwtPayload } from './strategies/jwt-strategies/merchant-jwt-payload.interface';
import { LoginAdminResponseDto } from 'src/user/admin/dto/login-admin/login-admin-response.dto';
import { LoginMerchantResponseDto } from 'src/user/merchant/dto';
import { AdminService } from 'src/user/admin/admin.service';
import { IAdmin } from 'src/user/admin/interfaces';
import { AdminJwtPayload } from './strategies/jwt-strategies/admin-jwt-payload.interface';
import { PosJwtPayload } from './strategies/jwt-strategies/pos-jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private customerService: CustomerService,
    private merchantService: MerchantService,
    private adminService: AdminService,
    private posService: PosService,
    private jwtService: JwtService,
  ) { }

  async validateCustomer(phoneNumber: string, pass: string): Promise<any> {
    const user = await this.customerService.findCustomerByPhoneNumber(
      phoneNumber,
    );

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      phoneNumber: user.phoneNumber,
      sub: user.id,
      isCustomer: true,
    };
    return {
      statusCode: 200,
      message: 'Customer login successfully',
      data: {
        user: user,
        access_token: this.jwtService.sign(payload),
      },
    };
  }

  async validateMerchant(username: string, password: string): Promise<IMerchant> {
    const user = await this.merchantService.getAuthenticatedMerchant(username, password);

    return user;
  }

  async merchantLogin(user: IMerchant): Promise<LoginMerchantResponseDto> {
    const { id, username } = user;
    const payload: MerchantJwtPayload = {
      merchantId: id,
      merchantUsername: username
    };

    return {
      statusCode: 200,
      message: 'Merchant login successfully',
      data: {
        user: {
          id,
          username
        },
        access_token: this.jwtService.sign(payload),
      },
    };
  }

  async validateAdmin(username: string, password: string): Promise<IAdmin> {
    const user = await this.adminService.getAuthenticatedAdmin(username, password);

    return user;
  }

  async adminLogin(user: IMerchant): Promise<LoginAdminResponseDto> {
    const { id, username } = user;
    const payload: AdminJwtPayload = {
      adminId: id,
      adminUsername: username
    };

    return {
      statusCode: 200,
      message: 'Admin login successfully',
      data: {
        user: {
          id,
          username,
        },
        access_token: this.jwtService.sign(payload),
      },
    };
  }

  async validatePos(username: string, password: string, restaurantId: string): Promise<IStaffLogin> {
    const user = await this.posService.getAuthenticatedStaff(username, password, restaurantId);

    return user;
  }

  async posLogin(user: IStaffLogin): Promise<LoginPosResponseDto> {
    const { id, username, firstName, fullName, lastName, restaurantId } = user;
    const payload: PosJwtPayload = {
      staffId: id,
      staffUsername: username,
      restaurantId: restaurantId
    };

    return {
      statusCode: 200,
      message: 'Pos login successfully',
      data: {
        user: {
          id,
          username,
          firstName,
          fullName,
          lastName,
          restaurantId
        },
        access_token: this.jwtService.sign(payload),
      },
    };
  }
}
