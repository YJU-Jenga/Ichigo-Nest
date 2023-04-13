import { Controller, Post, Get, Patch, Delete, Query, Param, UseInterceptors, UploadedFile, UsePipes, ValidationPipe, ParseIntPipe, Res, Body, Request, HttpStatus, Bind, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WritePostDto, UpdatePostDto } from "./dto";
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from './post.service';
import { Response } from 'express';
import { multerDiskOptions } from '../utils/multer.option';
import { AxiosError } from 'axios';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('post')
@ApiTags("Post")
export class PostController {
  constructor(private readonly postService:PostService){}

  // 1 = 상품 문의 게시판
  // 2 = Q & A 게시판
  // 3 = 상품 후기 게시판

  // 게시글 생성 - 상품 문의
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('write_product_inquiry')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file', multerDiskOptions))
  @ApiOperation({
    summary: '상품 문의 작성',
    description: '상품 문의 작성 API'
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { success: true },
    }
  })
  async writeProductInquiryPost( @UploadedFile() file: Express.Multer.File, @Body() writePostDto: WritePostDto, @Res() res: Response) {
    try {
      writePostDto.writer = JSON.parse(writePostDto.writer.toString()).writer
      writePostDto.title = JSON.parse(writePostDto.title).title
      writePostDto.secret = JSON.parse(writePostDto.secret.toString()).secret
      writePostDto.password = JSON.parse(writePostDto.password).password
      writePostDto.content = JSON.parse(writePostDto.content).content

      if(writePostDto.secret) {
        if(writePostDto.password.length == 0) {
          throw new AxiosError('비밀번호를 양식에 맞게 작성하지 않음')
        }
      } else {
        writePostDto.password = ''
      }
  
      const result = await this.postService.write(file, 1, writePostDto)
      return res.status(HttpStatus.OK).json({success: result});
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  }

  @Get("product_inquiry_all") 
  @ApiOperation({
    summary: '상품 문의 전체 조회',
    description: '상품 문의 조회 API'
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('write_q&a')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file', multerDiskOptions))
  @ApiOperation({
    summary: 'Q & A 작성',
    description: 'Q & A 작성 API'
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { success: true },
    }
  })
  async writeQAPost( @UploadedFile() file: Express.Multer.File, @Body() writePostDto: WritePostDto, @Res() res: Response) {
    try {
      writePostDto.writer = JSON.parse(writePostDto.writer.toString()).writer
      writePostDto.title = JSON.parse(writePostDto.title).title
      writePostDto.secret = JSON.parse(writePostDto.secret.toString()).secret
      writePostDto.password = JSON.parse(writePostDto.password).password
      writePostDto.content = JSON.parse(writePostDto.content).content

      if(writePostDto.secret) {
        if(writePostDto.password.length == 0) {
          throw new AxiosError('비밀번호를 양식에 맞게 작성하지 않음')
        }
      } else {
        writePostDto.password = ''
      }
      const result = await this.postService.write(file, 2, writePostDto)
      return res.status(HttpStatus.OK).json({success: result});
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  }

  @Get("q&a_all")
  @ApiOperation({
    summary: 'Q & A 전체 조회',
    description: 'Q & A 전체 조회 API'
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('write_item_use')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file', multerDiskOptions))
  @ApiOperation({
    summary: '상품 후기 작성',
    description: '상품 후기 작성 API'
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { success: true },
    }
  })
  async writeItemUsePost( @UploadedFile() file: Express.Multer.File, @Body() writePostDto: WritePostDto, @Res() res: Response) {
    try {
      writePostDto.writer = JSON.parse(writePostDto.writer.toString()).writer
      writePostDto.title = JSON.parse(writePostDto.title).title
      writePostDto.secret = JSON.parse(writePostDto.secret.toString()).secret
      writePostDto.password = JSON.parse(writePostDto.password).password
      writePostDto.content = JSON.parse(writePostDto.content).content
  
      if(writePostDto.secret) {
        if(writePostDto.password.length == 0) {
          throw new AxiosError('비밀번호를 양식에 맞게 작성하지 않음')
        }
      } else {
        writePostDto.password = ''
      }
      const result = await this.postService.write(file, 3, writePostDto)
      return res.status(HttpStatus.OK).json({success: result});
    } catch (error) {
      if(error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  }

  @Get("item_use_all")
  @ApiOperation({
    summary: '상품 후기 전체 조회',
    description: '상품 후기 조회 API'
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
    summary: '게시글 내용 조회',
    description: '게시글 내용 조회 API'
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
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
  ) {
    try {
      updatePostDto.writer = JSON.parse(updatePostDto.writer.toString()).writer
      updatePostDto.title = JSON.parse(updatePostDto.title).title
      updatePostDto.secret = JSON.parse(updatePostDto.secret.toString()).secret
      updatePostDto.password = JSON.parse(updatePostDto.password).password
      updatePostDto.content = JSON.parse(updatePostDto.content).content
  
      if(updatePostDto.secret) {
        if(updatePostDto.password.length == 0) {
          throw new AxiosError('비밀번호를 양식에 맞게 작성하지 않음')
        }
      } else {
        updatePostDto.password = ''
      }
      const result = await this.postService.update(null, id, updatePostDto);
      return res.status(HttpStatus.OK).json({success:result});
    } catch (error) {
      if(error instanceof AxiosError) {
        throw new AxiosError('비밀번호를 양식에 맞게 입력하세요')
      }
    }
  }

  

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
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
    const result = await this.postService.delete(id);
    return res.status(HttpStatus.OK).json({success:result});
    
  }

  // @Get("seed")
  // @ApiOperation({
  //   summary: 'seeding',
  //   description: '게시글 시딩 API'
  // })
  // @ApiCreatedResponse({
  //   description: '성공여부',
  //   schema: {
  //     example: { success: true },
  //   }
  // })
  // async seed(@Res() res: Response) {
  //   const result = await this.postService.seed();
  //   return  res.status(HttpStatus.OK).json({success: result});
  // }


}
