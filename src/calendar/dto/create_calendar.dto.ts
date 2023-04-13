import { IsNotEmpty } from "class-validator";
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
    example: 1,
    description: '제목',
    required: true
   })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    example: 1,
    description: '시작',
    required: true
   })
  @IsNotEmpty()
  start: Date;

  @ApiProperty({ 
    example: 1,
    description: '끝',
    required: true
   })
  @IsNotEmpty()
  end: Date;

  @ApiProperty({ 
    example: 1,
    description: '장소',
    required: false
   })
  location?: string|null;

  @ApiProperty({ 
    example: 1,
    description: '내용',
    required: false
   })
  description?: string|null;
}
  