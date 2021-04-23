import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginAdminDto {
  @ApiProperty({ example: 'admin123', uniqueItems: true, required: true })
  @IsString()
  username: string;

  @ApiProperty({ minLength: 6, example: '123123', required: true })
  @IsString()
  password: string;
}