import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'ユーザーID(メール形式)',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'メール形式に合わせて記入してください。' })
  email: string;

  @ApiProperty({
    example: '*qW23456',
    description: 'ユーザーのパスワード:最小8文字、最大16文字、1つ以上の大文字、1つの小文字、1つの数字、1つの特殊文字。',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  // 最小8文字、最大16文字、1つ以上の大文字、1つの小文字、1つの数字、1つの特殊文字。
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/, {
    message: 'パスワードフォームに合わせて記入してください。',
  })
  password: string;
}