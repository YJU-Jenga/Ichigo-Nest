import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength} from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class WritePostDto {
  @ApiProperty({ 
    example: '제목 01',
    description: '게시글 제목',
    required: true
   })
  @IsNotEmpty()
  title: string;
  
  @ApiProperty({ 
    example: '0000',
    description: '게시글 비밀번호 - 숫자 4글자',
   })
  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(4)
  // 숫자 4글자
  @Matches(
    /^[0-9]{0,4}$/,
    { 
      message: '비밀번호 양식에 맞게 작성하세요.',
    }
  )
  password: string;

  @ApiProperty({ 
    example: false,
    description: '비밀글 설정',
    required: true
   })
  @IsNotEmpty()
  secret: boolean;

  @ApiProperty({ 
    example: '내용',
    description: '게시글 내용',
    required: true
   })
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdatePostDto extends PartialType(WritePostDto) {}
