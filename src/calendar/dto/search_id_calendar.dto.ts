import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SearchIdCalendarDto {
  @ApiProperty({ 
    example: 1,
    description: 'ユーザーのid',
    required: true
   })
  @IsNotEmpty()
  userId: number;
}
  