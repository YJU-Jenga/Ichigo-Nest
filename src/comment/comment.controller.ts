import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { UpdateCommentDto, WriteCommentDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('comment')
@ApiTags('Comment') // Swaggerタグの設定
export class CommentController {
  constructor(private readonly commentService: CommentService){} // 依存性の注入、CommentServiceクラスのインスタンスを注入

  /**
   * @author ckcic
   * @description コメントを作成するメソッド
   *
   * @param dto コメント作成DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard) // 検証済みのユーザーのみアクセス可能 - トークン発行済みのユーザー
  @ApiBearerAuth('access-token') // SwaggerでのJWTトークンキーの設定
  @Post("/write") // localhost:5000/comment/write
  @ApiOperation({
    summary: 'コメントを作成',
    description: 'コメントを作成するAPI'
  })
  @UsePipes(ValidationPipe) // dtoがバリデーションルールに従っているか検証
  async write(@Body() dto: WriteCommentDto): Promise<void>{
    return this.commentService.write(dto)
  }


  /**
   * @author ckcic
   * @description 投稿のコメントを全て取得するメソッド
   *
   * @param postId 投稿の固有id
   * @returns {Promise<Comment[]>} 全てのコメントのデータを戻り値として返す
   */
  @Get("/getAll/:postId") // localhost:5000/getAll/1
  @ApiOperation({
    summary: '投稿のコメントを全て取得',
    description: '投稿のコメントを全て取得するAPI'
  })
  async getAll(@Param('postId', ParseIntPipe) postId: number){ // postIdが整数型なのか検証
    return this.commentService.getAll(postId)
  }


  /**
   * @author ckcic
   * @description コメントを取得するメソッド
   *
   * @param id コメントの固有id
   * @returns {Promise<Comment>} コメントのデータを戻り値として返す
   */
  @Get("/getOne/:id") // localhost:5000/comment/getOne/1
  @ApiOperation({
    summary: 'コメントを取得',
    description: 'コメントを取得するAPI'
  })
  async getOne(@Param('id', ParseIntPipe) id:number ){ // idが整数型なのか検証
    return this.commentService.getOne(id)
  }


  /**
   * @author ckcic
   * @description コメントを更新するメソッド
   *
   * @param id コメントの固有id 
   * @param dto コメント更新DTO
   * @returns {Promise<void>} 
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch("/update/:id") // localhost:5000/comment/update/1
  @ApiOperation({
    summary: 'コメントを更新',
    description: 'コメントを更新するAPI'
  })
  @UsePipes(ValidationPipe)
  async update(@Param('id', ParseIntPipe) id:number, @Body() dto: UpdateCommentDto){ // idが整数型なのか検証
    return this.commentService.update(id, dto)
  }


  /**
   * @author ckcic
   * @description コメントを削除するメソッド
   *
   * @param id コメントの固有id
   * @returns {Promise<void>} 
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete("/delete/:id") // localhost:5000/comment/delete/1
  @ApiOperation({
    summary: 'コメントを削除',
    description: 'コメントを削除するAPI'
  })
  async delete(@Param('id', ParseIntPipe) id:number){ // idが整数型なのか検証
    return this.commentService.delete(id)
  }
}
