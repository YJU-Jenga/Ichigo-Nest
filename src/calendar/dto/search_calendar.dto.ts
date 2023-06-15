import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SearchCalendarDto {
  @ApiProperty({ 
    example: 1,
    description: 'ユーザーのid',
    required: true
   })
  @IsNotEmpty()
  userId: number;
  
  @ApiProperty({ 
    example: "2023-04-17T09:00:00.000Z",
    description: 'スケジュール開始時間',
    required: true
   })
  @IsNotEmpty()
  dateString: Date;
}
  