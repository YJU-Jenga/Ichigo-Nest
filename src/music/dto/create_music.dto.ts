import { IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMusicDto {
  @ApiProperty({ 
    example: 1,
    description: 'ユーザーのid',
    required: true
   })
  @IsNotEmpty({message: 'ユーザー情報が記入してください。'})
  user_id: number;

  @ApiProperty({ 
    example: '童謡_海',
    description: 'アラーム登録用の音声ファイルの名前',
    required: true
  })
  @IsNotEmpty({message: '音声ファイルの名前を記入してください。'})
  name: string;
}
  

  
