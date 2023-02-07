import { Controller, Post, UseInterceptors, UploadedFile, UsePipes, ValidationPipe, Res, Body, Request, HttpStatus, Bind } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WritePostDto, UpdatePostDto } from "./dto/post.dto";
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from './post.service';
import { Response } from 'express';
import { multerDiskOptions } from '../utils/multer.option';

@Controller('post')
export class PostController {
  constructor(private readonly postService:PostService){}

  // 1 = 상품 문의 게시판
  // 2 = Q & A 게시판
  // 3 = 후기 게시판

  // 게시글 생성 - 상품 문의
  @Post('write_product_inquiry')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file', multerDiskOptions))
  @ApiOperation({
    summary: '상품 문의 생성',
    description: '상품 문의 생성 API'
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { success: true },
    }
  })
  async writePost( @UploadedFile() file: Express.Multer.File, @Body() writePostDto: WritePostDto, @Res() res: Response) {
    // console.log(file);
    await this.postService.write(file, writePostDto).then((result) => {
      res.status(HttpStatus.OK).json({success: result})
    });
  }
}
