import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { UpdateCommentDto, WriteCommentDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('comment')
@ApiTags('Comment')
export class CommentController {
  constructor(private readonly commentService: CommentService){}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post("/write")
  @ApiOperation({
    summary: '댓글 작성',
    description: '댓글 작성 API'
  })
  @UsePipes(ValidationPipe)
  async write(@Body() dto: WriteCommentDto){
    return this.commentService.write(dto)
  }

  @Get("/getAll/:postId")
  @ApiOperation({
    summary: '해당 게시글의 댓글 전체 조회',
    description: '해당 게시글의 댓글 전체 조회 API'
  })
  async getAll(@Param('postId', ParseIntPipe) postId: number){
    return this.commentService.getAll(postId)
  }

  @Get("/getOne/:id")
  @ApiOperation({
    summary: '댓글 조회',
    description: '댓글 조회 API'
  })
  async getOne(@Param('id', ParseIntPipe) id:number ){
    return this.commentService.getOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch("/update/:id")
  @ApiOperation({
    summary: '댓글 수정',
    description: '댓글 수정 API'
  })
  async update(@Param('id', ParseIntPipe) id:number, @Body() dto: UpdateCommentDto){
    return this.commentService.update(id, dto)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete("/delete/:id")
  @ApiOperation({
    summary: '댓글 삭제',
    description: '댓글 삭제 API'
  })
  async delete(@Param('id', ParseIntPipe) id:number){
    return this.commentService.delete(id)
  }
}
