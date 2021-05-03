import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class VerifyAppKeyDto {
  @ApiProperty({ example: '1234-1234-1234', required: true })
  @IsString()
  posAppKey: string;

  @ApiProperty({ example: '308068d8-50eb-42e8-9a1f-10ec02c95718', required: true })
  @IsString()
  deviceId: string;
}