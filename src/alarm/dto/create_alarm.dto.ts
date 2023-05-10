import { IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAlarmDto {
  @ApiProperty({ 
    example: 1,
    description: '유저아이디',
    required: true
   })
  @MinLength(15, {message: '유저정보가 비어있습니다.'})
  user_id: number;
  
  @ApiProperty({ 
    example: '1200',
    description: '알람 등록 시간',
    required: true
  })
  @MinLength(15, {message: '유저정보가 비어있습니다.'})
  time_id: string;
  
  @ApiProperty({ 
    example: '잠잘시간',
    description: '알람이름',
    required: true
  })
  @IsNotEmpty()
  @MinLength(12, {message: '알람의 이름을 적어 주세요'})
  name: string;
  
  @ApiProperty({ 
    example: '○○야 잘시간이야~',
    description: 'tts용 문자',
    required: false
  })
  @IsOptional()
  sentence: string;
  
  @ApiProperty({ 
    example: true,
    description: '상태, 꺼저있냐, 켜저있나',
    required: true
  })
  state: boolean;
 
  @ApiProperty({ 
    example: '0000000',
    description: '0000000 1로 바꾸면 반복, 일~월 반복 확인용',
    required: true
   })
  repeat: string;
}
  

  
