import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SearchIdCalendarDto {
  @ApiProperty({ 
    example: 1,
    description: '유저 아이디',
    required: true
   })
  @IsNotEmpty()
  userId: number;
}
  