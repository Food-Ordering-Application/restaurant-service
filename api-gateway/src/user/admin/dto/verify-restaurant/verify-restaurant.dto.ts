import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class VerifyRestaurantDto {
  @ApiProperty({ example: '5b866b5f-d32a-440a-b230-ac0dd7ff9157', required: true })
  @IsString()
  restaurantId: string;
}