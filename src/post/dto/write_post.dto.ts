import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength} from "class-validator";
import { ApiProperty} from "@nestjs/swagger";

export class WritePostDto {
  @ApiProperty({ 
    example: '1',
    description: 'ユーザーのid',
    required: true
   })
  @IsNotEmpty()
  writer: number;

  @ApiProperty({ 
    example: 'タイトル01',
    description: '投稿のタイトル',
    required: true
   })
  @MinLength(13, {message: 'タイトルを記入してください。'}) // フロントエンドで JSON.stringify({ title: form.title })してデータを送るので実際のデータが空いているか確認
  @IsNotEmpty()
  title: string;
  
  @ApiProperty({ 
    example: '0000',
    description: '投稿のパスワード - 整数 4文字',
   })
  @IsString()
  @IsOptional()
  // 整数 4文字
  @Matches(
    /^({.*")([0-9]{0}|[0-9]{4})("})$/,
    { 
      message: 'パスワードフォームに合わせて記入してください。',
    }
  )
  password: string;

  @ApiProperty({ 
    example: false,
    description: '非公開設定',
    required: true
   })
  @IsNotEmpty()
  secret: boolean;

  @ApiProperty({ 
    example: '内容です～',
    description: '投稿の内容',
    required: true
   })
  @IsString()
  @MinLength(15, {message: '投稿の内容を記入してください'}) // フロントエンドで JSON.stringify({ content: form.content })してデータを送るので実際のデータが空いているか確認
  @IsNotEmpty()
  content: string;
}
