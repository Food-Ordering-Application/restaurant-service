import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class VerifyAppKeyDto {
  @ApiProperty({ example: '8AAC72387AEDF73E71FFCA20F20E23C9C2F02B26', required: true })
  @IsString()
  posAppKey: string;
}