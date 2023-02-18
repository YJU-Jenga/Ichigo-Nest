import { IsNotEmpty, IsPhoneNumber, IsString, IsEmail, Matches, MaxLength, MinLength} from "class-validator";
import { ApiProperty,  } from "@nestjs/swagger";

export class SignUpDto {
  @ApiProperty({ 
    example: 'client@gmail.com',
    description: '유저 아이디(이메일 형식)',
    required: true
   })
   @IsEmail()
   @IsNotEmpty()
  email: string;
  
  @ApiProperty({ 
    example: '1234qweR!!',
    description: '유저 비밀번호 - 최소 8자 및 최대 16자, 하나 이상의 대문자, 하나의 소문자, 하나의 숫자 및 하나의 특수 문자',
    required: true
   })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  // 최소 8자 및 최대 16자, 하나 이상의 대문자, 하나의 소문자, 하나의 숫자 및 하나의 특수 문자
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
    { 
      message: '비밀번호 양식에 맞게 작성하세요.',
    }
  )
  password: string;

  @ApiProperty({ 
    example: 'client',
    description: '유저 이름(닉네임)',
    required: true
   })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    example: '010-1111-1111',
    description: '유저 핸드폰번호',
    required: true
  })
  @IsString()
  @Matches(
    /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
    { 
      message: '양식에 맞게 작성하세요.',
    }
  )
  @IsNotEmpty()
  phone: string;
}