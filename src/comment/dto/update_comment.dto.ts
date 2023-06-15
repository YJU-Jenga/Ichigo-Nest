import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCommentDto {
  @ApiProperty({ 
    example: '1',
    description: 'ユーザーのid',
    required: true
   })
  @IsNotEmpty()
  writer: number;

  @ApiProperty({ 
    example: '1',
    description: '投稿の固有id',
    required: true
   })
  @IsNotEmpty()
  postId: number;

  @ApiProperty({ 
    example: '内容',
    description: 'コメントの内容',
    required: true
   })
  @IsString()
  @IsNotEmpty()
  content: string;
}
  

  
