import { IsNotEmpty, IsPhoneNumber, IsString, IsEmail, Matches, MaxLength, MinLength} from "class-validator";
import { ApiProperty,  } from "@nestjs/swagger";

export class SignUpDto {
  @ApiProperty({ 
    example: 'client@gmail.com',
    description: 'ユーザーID(メール形式)',
    required: true
   })
   @IsEmail({}, { message: 'メール形式に合わせて記入してください。' })
   @IsNotEmpty()
  email: string;
  
  @ApiProperty({ 
    example: '1234qweR!!',
    description: 'ユーザーのパスワード:最小8文字、最大16文字、1つ以上の大文字、1つの小文字、1つの数字、1つの特殊文字。',
    required: true
   })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  // 最小8文字、最大16文字、1つ以上の大文字、1つの小文字、1つの数字、1つの特殊文字。
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
    { 
      message: 'パスワードフォームに合わせて記入してください。',
    }
  )
  password: string;

  @ApiProperty({ 
    example: 'client',
    description: 'ユーザー名（ニックネーム）',
    required: true
   })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    example: '010-1111-1111',
    description: 'ユーザーの電話番号',
    required: true
  })
  @IsString()
  @Matches(
    /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
    { 
      message: 'フォームに合わせて記入してください',
    }
  )
  @IsNotEmpty()
  phone: string;
}