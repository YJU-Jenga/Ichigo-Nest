import { IsNotEmpty, IsNumber, IsString, IsEmail, Matches, MaxLength, MinLength } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ description: 'user_id' })
  @IsString()
  @IsNotEmpty()
  user_id: string;
  
  @ApiProperty({ description: 'password' })
  @IsString()
  @IsNotEmpty()
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

  @ApiProperty({ description: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'age' })
  @IsNumber()
  @IsNotEmpty()
  age: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {

}
