import { IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAlarmDto {
  @ApiProperty({ 
    example: 1,
    description: 'ユーザーのid',
    required: true
   })
  @IsNotEmpty({message: 'ユーザー情報が記入してください。'})
  user_id: number;
  
  @ApiProperty({ 
    example: '1200',
    description: 'アラーム登録時間',
    required: true
  })
  @IsNotEmpty({message: 'ユーザー情報が記入してください。'})
  time_id: string;
  
  @ApiProperty({ 
    example: '寝る時間',
    description: 'アラームの名前',
    required: true
  })
  @IsNotEmpty({message: 'アラームの名前を記入してください。'})
  name: string;
  
  @ApiProperty({ 
    example: '○○君 眠る時間だよ~',
    description: 'tts用文字',
    required: false
  })
  @IsOptional()
  sentence: string;

  @ApiProperty({ 
    example: 'uploads/music/asdf.mp3',
    description: 'ファイルパス',
    required: false
  })
  @IsOptional()
  file: string;
  
  @ApiProperty({ 
    example: true,
    description: '状態、オフか、オンか',
    required: true
  })
  @IsNotEmpty()
  state: boolean;
 
  @ApiProperty({ 
    example: '0000000',
    description: '0000000 1に変更すると繰り返し、日~月繰り返し確認用',
    required: true
   })
  @IsNotEmpty()
  repeat: string;
}
  

  
