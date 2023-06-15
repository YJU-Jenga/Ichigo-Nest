import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCalendarDto {
  @ApiProperty({ 
    example: 1,
    description: 'ユーザーのid',
    required: true
   })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ 
    example: "Meeting with clients",
    description: 'スケジュールのタイトル',
    required: true
   })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    example: "2023-04-17T09:00:00.000Z",
    description: 'スケジュール開始時間',
    required: true
   })
  @IsNotEmpty()
  start: string;

  @ApiProperty({ 
    example: "2023-04-17T11:00:00.000Z",
    description: 'スケジュール終了時間',
    required: true
   })
  @IsNotEmpty()
  end: string;

  @ApiProperty({ 
    example: "Conference room A",
    description: '場所',
    required: false
   })
  @IsOptional()
  location?: string;

  @ApiProperty({ 
    example: "Meeting",
    description: 'スケジュールの内容',
    required: false
   })
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    example: "-540",
    description: 'utcOffset',
    required: true
   })
  @IsNotEmpty()
  utcOffset: string;
}
  