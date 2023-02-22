import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class WriteCommentDto {
  @ApiProperty({ 
    example: '1',
    description: '작성자',
    required: true
   })
  @IsNotEmpty()
  writer: number;

  @ApiProperty({ 
    example: '1',
    description: '게시글 번호',
    required: true
   })
  @IsNotEmpty()
  postId: number;

  @ApiProperty({ 
    example: '내용',
    description: '댓글 내용',
    required: true
   })
  @IsString()
  @IsNotEmpty()
  content: string;
}
  

  
