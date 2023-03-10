import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'client@gmail.com',
    description: '유저 아이디(이메일 형식)',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: '이메일 형식에 맞게 작성하세요' })
  email: string;

  @ApiProperty({
    example: '1234qweR!!',
    description: '유저 비밀번호 - 최소 8자 및 최대 20자 하나의 소문자, 하나의 숫자 및 하나의 특수 문자',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  // 최소 8자 및 최대 20자 하나의 소문자, 하나의 숫자 및 하나의 특수 문자
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/, {
    message: '비밀번호 양식에 맞게 작성하세요.',
  })
  password: string;
}