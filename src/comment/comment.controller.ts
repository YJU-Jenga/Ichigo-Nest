import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { UpdateCommentDto, WriteCommentDto } from './dto';

@Controller('comment')
@ApiTags('Comment')
export class CommentController {
  constructor(private readonly commentService: CommentService){}

  @Post("/write")
  @UsePipes(ValidationPipe)
  async write(@Body() dto: WriteCommentDto){
    return this.commentService.write(dto)
  }

  @Get("/getAll/:postId")
  async getAll(@Param('postId', ParseIntPipe) postId: number){
    return this.commentService.getAll(postId)
  }

  @Get("/getOne/:id")
  async getOne(@Param('id', ParseIntPipe) id:number ){
    return this.commentService.getOne(id)
  }

  @Patch("/update/:id")
  async update(@Param('id', ParseIntPipe) id:number, @Body() dto: UpdateCommentDto){
    return this.commentService.update(id, dto)
  }

  @Delete("/delete/:id")
  async delete(@Param('id', ParseIntPipe) id:number){
    return this.commentService.delete(id)
  }
}
