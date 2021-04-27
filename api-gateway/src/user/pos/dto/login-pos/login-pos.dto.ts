import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginPosDto {
  @ApiProperty({ example: 'staff123', uniqueItems: true, required: true })
  @IsString()
  username: string;

  @ApiProperty({ minLength: 6, example: '123123', required: true })
  @IsString()
  password: string;

  @ApiProperty({ minLength: 6, example: '7e8f39b4-fd48-4af9-93c0-37170deca4f1', required: true })
  @IsString()
  restaurantId: string;
}