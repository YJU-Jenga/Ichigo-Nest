import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCalendarDto {
  @ApiProperty({ 
    example: 1,
    description: '유저 아이디',
    required: true
   })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ 
    example: "Meeting with clients",
    description: '제목',
    required: true
   })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    example: "2023-04-17T09:00:00.000Z",
    description: '시작',
    required: true
   })
  @IsNotEmpty()
  start: string;

  @ApiProperty({ 
    example: "2023-04-17T11:00:00.000Z",
    description: '끝',
    required: true
   })
  @IsNotEmpty()
  end: string;

  @ApiProperty({ 
    example: "Conference room A",
    description: '장소',
    required: false
   })
  @IsOptional()
  location?: string;

  @ApiProperty({ 
    example: "Meeting",
    description: '내용',
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
  