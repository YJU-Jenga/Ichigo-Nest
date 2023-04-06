import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength} from "class-validator";
import { ApiProperty} from "@nestjs/swagger";

export class WritePostDto {

  @ApiProperty({ 
    example: '1',
    description: '작성자',
    required: true
   })
  @IsNotEmpty()
  writer: number;


  @ApiProperty({ 
    example: '제목 01',
    description: '게시글 제목',
    required: true
   })
  @MinLength(13, {message: '제목을 입력해주세요'})
  @IsNotEmpty()
  title: string;
  
  @ApiProperty({ 
    example: '0000',
    description: '게시글 비밀번호 - 숫자 4글자',
   })
  @IsString()
  @IsOptional()
  // @MinLength(0)
  // @MaxLength(4)
  // // 숫자 4글자
  @Matches(
    /^({.*")([0-9]{0}|[0-9]{4})("})$/,
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
  @MinLength(15, {message: '글 내용을 입력해주세요'})
  @IsNotEmpty()
  content: string;
}
