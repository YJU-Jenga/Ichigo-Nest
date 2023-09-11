import { Controller, Post, Get, Patch, Delete, Query, Param, UseInterceptors, UploadedFile, UsePipes, ValidationPipe, ParseIntPipe, Res, Body, Request, HttpStatus, Bind, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WritePostDto, UpdatePostDto } from "./dto";
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from './post.service';
import { Response } from 'express';
import { multerDiskOptions, multerS3Options } from '../utils/multer.option';
import { AxiosError } from 'axios';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('post')
@ApiTags("Post") // Swaggerタグの設定
export class PostController {
  constructor(private readonly postService:PostService){} // 依存性の注入、PostServiceクラスのインスタンスを注入

  // 掲示板の事前定義
  // 1 = 商品お問い合わせ掲示板
  // 2 = Q & A掲示板
  // 3 = 商品レビュー掲示板

  /**
   * @author ckcic
   * @description 投稿作成するメソッド- 商品お問い合わせ
   *
   * @param file イメージファイル
   * @param writePostDto 投稿作成DTO
   * @param res データを返すためのパラメーター
   * @returns レスポンスのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard) // 検証済みのユーザーのみアクセス可能 - トークン発行済みのユーザー
  @ApiBearerAuth('access-token') // SwaggerでのJWTトークンキーの設定
  @Post('write_product_inquiry') // localhost:5000/post/write_product_inquiry
  @UsePipes(ValidationPipe) // writePostDtoがバリデーションルールに従っているか検証
  // @UseInterceptors(FileInterceptor('file', multerDiskOptions)) // リクエストのファイル部分を処理
  @UseInterceptors(FileInterceptor('file', multerS3Options)) // リクエストのファイル部分を処理
  @ApiOperation({
    summary: '商品お問い合わせを作成',
    description: '商品お問い合わせを作成するAPI'
  })
  @ApiCreatedResponse({
    description: '成功かどうか',
    schema: {
      example: { success: true },
    }
  })
  async writeProductInquiryPost( @UploadedFile() file: Express.MulterS3.File, @Body() writePostDto: WritePostDto, @Res() res: Response) {
    try {
      writePostDto.writer = JSON.parse(writePostDto.writer.toString()).writer
      writePostDto.title = JSON.parse(writePostDto.title).title
      writePostDto.secret = JSON.parse(writePostDto.secret.toString()).secret
      writePostDto.password = JSON.parse(writePostDto.password).password
      writePostDto.content = JSON.parse(writePostDto.content).content

      if(writePostDto.secret) { // 非公開設定
        if(writePostDto.password.length == 0) { // パスワードがあるのか
          throw new AxiosError('パスワードを記入してください')
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

  /**
   * @author ckcic
   * @description 商品お問い合わせ掲示板の投稿を全て取得するメソッド
   *
   * @param res データを返すためのパラメーター
   * @returns 全ての商品お問い合わせ掲示板の投稿のデータをJSON形式で戻り値として返す
   */
  @Get("product_inquiry_all") // localhost:5000/post/product_inquiry_all
  @ApiOperation({
    summary: '商品お問い合わせ掲示板の投稿を全て取得',
    description: '商品お問い合わせ掲示板の投稿を全て取得するAPI'
  })
  @ApiCreatedResponse({
    description: '全ての商品お問い合わせ掲示板の投稿のデータ',
    schema: {
      example: [
        {
          "id": 1,
          "writer": 1,
          "boardId": 1,
          "title": "人形の充電について",
          "password": null,
          "content": "どのようにしたらいいの",
          "hit": 0,
          "state": false,
          "secret": true,
          "image": null,
          "createdAt": "2023-02-14T11:25:25.197Z",
          "updatedAt": "2023-02-14T11:25:25.197Z"
        },
      ],
    }
  })
  async getProductInquiryPost(@Res() res: Response) {
    const post = await this.postService.findAll(1);
    return res.json(post);
  }
  

  /**
   * @author ckcic
   * @description 投稿作成するメソッド- Q & A
   *
   * @param file イメージファイル
   * @param writePostDto 投稿作成DTO
   * @param res データを返すためのパラメーター
   * @returns レスポンスのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('write_q&a') // localhost:5000/post/write_q&a
  @UsePipes(ValidationPipe)
  // @UseInterceptors(FileInterceptor('file', multerDiskOptions))
  @UseInterceptors(FileInterceptor('file', multerS3Options))
  @ApiOperation({
    summary: 'Q & Aを作成',
    description: 'Q & Aを作成するAPI'
  })
  @ApiCreatedResponse({
    description: '成功かどうか',
    schema: {
      example: { success: true },
    }
  })
  async writeQAPost( @UploadedFile() file: Express.MulterS3.File, @Body() writePostDto: WritePostDto, @Res() res: Response) {
    try {
      writePostDto.writer = JSON.parse(writePostDto.writer.toString()).writer
      writePostDto.title = JSON.parse(writePostDto.title).title
      writePostDto.secret = JSON.parse(writePostDto.secret.toString()).secret
      writePostDto.password = JSON.parse(writePostDto.password).password
      writePostDto.content = JSON.parse(writePostDto.content).content

      if(writePostDto.secret) { // 非公開設定
        if(writePostDto.password.length == 0) { // パスワードがあるのか
          throw new AxiosError('パスワードを記入してください')
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


  /**
   * @author ckcic
   * @description Q & A 掲示板の投稿を全て取得するメソッド
   *
   * @param res データを返すためのパラメーター
   * @returns 全てのQ & A 掲示板の投稿のデータをJSON形式で戻り値として返す
   */
  @Get("q&a_all") // localhost:5000/post/q&a_all
  @ApiOperation({
    summary: 'Q & A 掲示板の投稿を全て取得',
    description: 'Q & A 掲示板の投稿を全て取得するAPI'
  })
  @ApiCreatedResponse({
    description: '全てのQ & A 掲示板の投稿のデータ',
    schema: {
      example: [
        {
          "id": 1,
          "writer": 1,
          "boardId": 2,
          "title": "配送について",
          "password": null,
          "content": "いつ配送が始まるのですか(# ﾟДﾟ)",
          "hit": 0,
          "state": false,
          "secret": true,
          "image": null,
          "createdAt": "2023-02-14T11:25:25.197Z",
          "updatedAt": "2023-02-14T11:25:25.197Z"
        },
      ]
    }
  })
  async getQAPost(@Res() res: Response) {
    const post = await this.postService.findAll(2);
    return res.json(post);
  }

  /**
   * @author ckcic
   * @description 投稿作成するメソッド- 商品レビュー
   *
   * @param file イメージファイル
   * @param writePostDto 投稿作成DTO
   * @param res データを返すためのパラメーター
   * @returns レスポンスのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('write_item_use') // localhost:5000/post/write_item_use
  @UsePipes(ValidationPipe)
  // @UseInterceptors(FileInterceptor('file', multerDiskOptions))
  @UseInterceptors(FileInterceptor('file', multerS3Options))
  @ApiOperation({
    summary: '商品レビューを作成',
    description: '商品レビューを作成するAPI'
  })
  @ApiCreatedResponse({
    description: '成功かどうか',
    schema: {
      example: { success: true },
    }
  })
  async writeItemUsePost( @UploadedFile() file: Express.MulterS3.File, @Body() writePostDto: WritePostDto, @Res() res: Response) {
    try {
      writePostDto.writer = JSON.parse(writePostDto.writer.toString()).writer
      writePostDto.title = JSON.parse(writePostDto.title).title
      writePostDto.secret = JSON.parse(writePostDto.secret.toString()).secret
      writePostDto.password = JSON.parse(writePostDto.password).password
      writePostDto.content = JSON.parse(writePostDto.content).content
  
      if(writePostDto.secret) { // 非公開設定
        if(writePostDto.password.length == 0) { // パスワードがあるのか
          throw new AxiosError('パスワードを記入してください')
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


  /**
   * @author ckcic
   * @description 商品レビュー掲示板の投稿を全て取得するメソッド
   *
   * @param res データを返すためのパラメーター
   * @returns 全ての商品レビュー掲示板の投稿のデータをJSON形式で戻り値として返す
   */
  @Get("item_use_all") // localhost:5000/post/item_use_all
  @ApiOperation({
    summary: '商品レビュー掲示板の投稿を全て取得',
    description: '商品レビュー掲示板の投稿を全て取得するAPI'
  })
  @ApiCreatedResponse({
    description: '全ての商品レビュー掲示板の投稿のデータ',
    schema: {
      example: [
        {
          "id": 1,
          "writer": 1,
          "boardId": 3,
          "title": "安くて心配しましたが",
          "password": null,
          "content": "とてもいいです！",
          "hit": 0,
          "state": false,
          "secret": true,
          "image": null,
          "createdAt": "2023-02-14T11:25:25.197Z",
          "updatedAt": "2023-02-14T11:25:25.197Z"
        },
      ]
    }
  })
  async getItemUsePost(@Res() res: Response) {
    const post = await this.postService.findAll(3);
    return res.json(post);
  }


  /**
   * @author ckcic
   * @description 投稿の内容を取得するメソッド
   *
   * @param res データを返すためのパラメーター
   * @returns 投稿のデータをJSON形式で戻り値として返す
   */
  @Get('/view/:id') // localhost:5000/post/view/1
  @ApiOperation({
    summary: '投稿の内容を取得',
    description: '投稿の内容を取得するAPI'
  })
  @ApiCreatedResponse({
    description: '成功かどうか',
    schema: {
      example: {
        "id": 1,
        "writer": 1,
        "boardId": 1,
        "title": "タイトル",
        "password": null,
        "content": "内容",
        "hit": 31,
        "state": false,
        "secret": false,
        "image": null,
        "createdAt": "2023-02-14T11:47:54.395Z",
        "updatedAt": "2023-02-15T06:43:06.000Z",
        "user": {
            "name": "ユーザーの名前"
        }
    },
    }
  })
  async viewPost(@Param('id', ParseIntPipe) id:number, @Res() res: Response) { // idが整数型なのか検証
    const post = await this.postService.view(id);
    return res.json(post);
  }


  /**
   * @author ckcic
   * @description 投稿の内容を更新するメソッド
   *
   * @param file イメージファイル
   * @param id 投稿の固有id
   * @param updatePostDto 投稿更新DTO
   * @param res データを返すためのパラメーター
   * @returns レスポンスのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('/update/:id') // localhost:5000/post/update/1
  // @UseInterceptors(FileInterceptor('file', multerDiskOptions))
  @UseInterceptors(FileInterceptor('file', multerS3Options))
  @ApiOperation({
    summary: '投稿の内容を更新',
    description: '投稿の内容を更新するAPI'
  })
  @ApiCreatedResponse({
    description: '成功かどうか',
    schema: {
      example: { success: true },
    }
  })
  @UsePipes(ValidationPipe)
  async updatePost(
    @UploadedFile() file: Express.MulterS3.File,
    @Param('id', ParseIntPipe) id: number, // idが整数型なのか検証
    @Body() updatePostDto : UpdatePostDto,
    @Res() res:Response
  ) {
    try {
      updatePostDto.writer = JSON.parse(updatePostDto.writer.toString()).writer
      updatePostDto.title = JSON.parse(updatePostDto.title).title
      updatePostDto.secret = JSON.parse(updatePostDto.secret.toString()).secret
      updatePostDto.password = JSON.parse(updatePostDto.password).password
      updatePostDto.content = JSON.parse(updatePostDto.content).content
  
      if(updatePostDto.secret) { // 非公開設定
        if(updatePostDto.password.length == 0) { // パスワードがあるのか
          throw new AxiosError('パスワードを記入してください')
        }
      } else {
        updatePostDto.password = ''
      }

      const result = await this.postService.update(file, id, updatePostDto);
      return res.status(HttpStatus.OK).json({success:result});
    } catch (error) {
      if(error instanceof AxiosError) {
        throw new AxiosError('パスワードを記入してください')
      }
    }
  }

  
  /**
   * @author ckcic
   * @description 投稿の内容を削除するメソッド
   *
   * @param id 投稿の固有id
   * @param res データを返すためのパラメーター
   * @returns レスポンスのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete('/delete_post') // localhost:5000/post/delete_post?id=1
  @ApiOperation({
    summary: '投稿の内容を削除',
    description: '投稿の内容を削除するAPI'
  })
  @ApiCreatedResponse({
    description: '成功かどうか',
    schema: {
      example: { success: true },
    }
  })
  async deletePost(@Query('id') id: number, @Res() res:Response) { 
    const result = await this.postService.delete(id);
    return res.status(HttpStatus.OK).json({success:result});
    
  }


  // テストコード
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
