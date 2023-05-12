import { IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateMusicDto {
  @ApiProperty({ 
    example: 1,
    description: '유저아이디',
    required: true
   })
  @IsNotEmpty({message: '유저정보가 비어있습니다.'})
  user_id: number;

  @ApiProperty({ 
    example: '음악1',
    description: '알람등록용 파일 이름',
    required: true
  })
  @IsNotEmpty({message: '파일의 이름을 적어 주세요'})
  name: string;
}
  

  
