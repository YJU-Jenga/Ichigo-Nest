import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { MusicService } from './music.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerS3Options } from 'src/utils/multer.option';
import { CreateMusicDto, UpdateMusicDto } from './dto';

@Controller('music')
@ApiTags('Music') // Swaggerタグの設定
export class MusicController {
  constructor(private readonly musicService: MusicService){} // 依存性の注入、MusicServiceクラスのインスタンスを注入

  /**
   * @author ckcic
   * @description アラーム登録用の音声ファイルを登録するメソッド
   *
   * @param file 音声ファイル
   * @param dto 音声ファイル登録DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard) // 検証済みのユーザーのみアクセス可能 - トークン発行済みのユーザー
  @ApiBearerAuth('access-token') // SwaggerでのJWTトークンキーの設定
  @Post("/create") // localhost:5000/music/create
  @UseInterceptors(FileInterceptor('file', multerS3Options)) // リクエストのファイル部分を処理
  @ApiOperation({
    summary: 'アラーム登録用の音声ファイルを登録',
    description: 'アラーム登録用の音声ファイルを登録するAPI'
  })
  @UsePipes(ValidationPipe) // dtoがバリデーションルールに従っているか検証
  async create(@UploadedFile() file: Express.MulterS3.File, @Body() dto: CreateMusicDto): Promise<void>{
    console.log(file);
    console.log(dto);
    return this.musicService.create(file ,dto)
  }

  /**
   * @author ckcic
   * @description ユーザーがアラーム用に登録した全ての音声ファイルを取得するメソッド
   *
   * @param user_id ユーザーの固有id
   * @param res データを返すためのパラメーター
   * @returns 全ての音声ファイルのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getAll/:user_id") // localhost:5000/music/getAll/1
  @ApiOperation({
    summary: 'ユーザーがアラーム用に登録した全て音声ファイルを取得',
    description: 'ユーザーがアラーム用に登録した全て音声ファイルを取得するAPI'
  })
  async getAll(@Param('user_id', ParseIntPipe) user_id: number, @Res() res: Response){ // user_idが整数型なのか検証
    const data = await this.musicService.getAll(user_id)
    return res.json(data);
  }
 

  /**
   * @author ckcic
   * @description アラーム用に登録した音声ファイルを取得するメソッド
   *
   * @param id 音声ファイルの固有id
   * @param res データを返すためのパラメーター
   * @returns 音声ファイルのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getOne/:id") // localhost:5000/music/getOne/1
  @ApiOperation({
    summary: 'アラーム用に登録した音声ファイルを取得',
    description: 'アラーム用に登録した音声ファイルを取得するAPI'
  })
  async getOne(@Param('id', ParseIntPipe) id:number,  @Res() res: Response){ // idが整数型なのか検証
    const data = await this.musicService.getOne(id)
    return res.json(data);
  }


  /**
   * @author ckcic
   * @description アラーム登録用の音声ファイルを更新するメソッド
   *
   * @param id 音声ファイルの固有id
   * @param file 音声ファイル
   * @param dto 音声ファイル更新DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch("/update/:id") // localhost:5000/music/update/1
  @UseInterceptors(FileInterceptor('file', multerS3Options))
  @ApiOperation({
    summary: 'アラーム登録用の音声ファイルを更新',
    description: 'アラーム登録用の音声ファイルを更新するAPI'
  })
  @UsePipes(ValidationPipe)
  async update(@Param('id', ParseIntPipe) id:number, @UploadedFile() file: Express.MulterS3.File,  @Body() dto: UpdateMusicDto): Promise<void>{ // idが整数型なのか検証
    return this.musicService.update(id, file, dto)
  }


  /**
   * @author ckcic
   * @description アラーム登録用の音声ファイルを削除するメソッド
   *
   * @param id 音声ファイルの固有id
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete("/delete/:id") // localhost:5000/music/delete/1
  @ApiOperation({
    summary: 'アラーム登録用の音声ファイルを削除',
    description: 'アラーム登録用の音声ファイルを削除するAPI'
  })
  async delete(@Param('id', ParseIntPipe) id:number){ // idが整数型なのか検証
    return this.musicService.delete(id)
  }
}
