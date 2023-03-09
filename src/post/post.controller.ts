import { Controller, Post, Get, Patch, Delete, Query, Param, UseInterceptors, UploadedFile, UsePipes, ValidationPipe, ParseIntPipe, Res, Body, Request, HttpStatus, Bind } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WritePostDto, UpdatePostDto } from "./dto";
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from './post.service';
import { Response } from 'express';
import { multerDiskOptions } from '../utils/multer.option';

@Controller('post')
@ApiTags("Post")
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
  async writeProductInquiryPost( @UploadedFile() file: Express.Multer.File, @Body() writePostDto: WritePostDto, @Res() res: Response) {
    await this.postService.write(file, 1, writePostDto).then((result) => {
      res.status(HttpStatus.OK).json({success: result});
    });
  }

  @Get("product_inquiry_all")
  @ApiOperation({
    summary: '상품 문의 전체 가져오기',
    description: '상품 문의 가져오는 API'
  })
  @ApiCreatedResponse({
    description: '게시글',
    schema: {
      example: {
        "id": 1,
        "writer": 1,
        "boardId": 1,
        "title": "제목1",
        "password": null,
        "content": "내용1",
        "hit": 0,
        "state": false,
        "secret": true,
        "image": null,
        "createdAt": "2023-02-14T11:25:25.197Z",
        "updatedAt": "2023-02-14T11:25:25.197Z"
      },
    }
  })
  async getProductInquiryPost(@Res() res: Response) {
    const post = await this.postService.findAll(1);
    return res.json(post);
  }
  
  // 게시글 생성 - Q & A
  @Post('write_q&a')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file', multerDiskOptions))
  @ApiOperation({
    summary: 'Q & A 생성',
    description: 'Q & A 생성 API'
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { success: true },
    }
  })
  async writeQAPost( @UploadedFile() file: Express.Multer.File, @Body() writePostDto: WritePostDto, @Res() res: Response) {
    await this.postService.write(file, 2, writePostDto).then((result) => {
      res.status(HttpStatus.OK).json({success: result});
    });
  }

  @Get("q&a_all")
  @ApiOperation({
    summary: 'Q & A 전체 가져오기',
    description: 'Q & A 가져오는 API'
  })
  @ApiCreatedResponse({
    description: '게시글',
    schema: {
      example: {
        "id": 1,
        "writer": 1,
        "boardId": 2,
        "title": "제목1",
        "password": null,
        "content": "내용1",
        "hit": 0,
        "state": false,
        "secret": true,
        "image": null,
        "createdAt": "2023-02-14T11:25:25.197Z",
        "updatedAt": "2023-02-14T11:25:25.197Z"
      },
    }
  })
  async getQAPost(@Res() res: Response) {
    const post = await this.postService.findAll(2);
    return res.json(post);
  }

  // 게시글 생성 - 후기
  @Post('write_item_use')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file', multerDiskOptions))
  @ApiOperation({
    summary: '상품 후기 생성',
    description: '상품 후기 생성 API'
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { success: true },
    }
  })
  async writeItemUsePost( @UploadedFile() file: Express.Multer.File, @Body() writePostDto: WritePostDto, @Res() res: Response) {
    await this.postService.write(file, 3, writePostDto).then((result) => {
      res.status(HttpStatus.OK).json({success: result});
    });
  }

  @Get("item_use_all")
  @ApiOperation({
    summary: '상품 후기 전체 가져오기',
    description: '상품 후기 가져오는 API'
  })
  @ApiCreatedResponse({
    description: '게시글',
    schema: {
      example: {
        "id": 1,
        "writer": 1,
        "boardId": 3,
        "title": "제목1",
        "password": null,
        "content": "내용1",
        "hit": 0,
        "state": false,
        "secret": true,
        "image": null,
        "createdAt": "2023-02-14T11:25:25.197Z",
        "updatedAt": "2023-02-14T11:25:25.197Z"
      },
    }
  })
  async getItemUsePost(@Res() res: Response) {
    const post = await this.postService.findAll(3);
    return res.json(post);
  }

  @Get('/view/:id')
  @ApiOperation({
    summary: '게시글 내용 가져오기',
    description: '게시글 내용 불러오는 API'
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: {
        "id": 1,
        "writer": 1,
        "boardId": 1,
        "title": "제목 1",
        "password": null,
        "content": "내용 1",
        "hit": 31,
        "state": false,
        "secret": false,
        "image": null,
        "createdAt": "2023-02-14T11:47:54.395Z",
        "updatedAt": "2023-02-15T06:43:06.000Z",
        "user": {
            "name": "작성자 이름"
        }
    },
    }
  })
  async viewPost(@Param('id', ParseIntPipe) id:number, @Res() res: Response) {
    const post = await this.postService.view(id);
    return res.json(post);
  }

  @Patch('/update/:id')
  @ApiOperation({
    summary: '게시글 수정',
    description: '게시글 수정 API'
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { success: true },
    }
  })
  @UsePipes(ValidationPipe)
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto : UpdatePostDto,
    @Res() res:Response
  ): Promise<void> {
    return await this.postService.update(null, id,updatePostDto).then((result) => {
      res.status(HttpStatus.OK).json({success:result});
    });
  }

  

  @Delete('/delete_post')
  @ApiOperation({
    summary: '게시글 삭제',
    description: '게시글 삭제 API'
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { success: true },
    }
  })
  async deletePost(@Query('id') id: number, @Res() res:Response) {
    return await this.postService.delete(id).then((result)=>{
      res.status(HttpStatus.OK).json({success:result});
    });
  }

  @Get("seed")
  @ApiOperation({
    summary: 'seeding',
    description: '게시글 시딩 API'
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { success: true },
    }
  })
  async seed(@Res() res: Response) {
    await this.postService.seed().then((result) => {
      res.status(HttpStatus.OK).json({success: result});
    });
  }


}
