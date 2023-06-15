import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerClothesOptions } from 'src/utils/multer.option';
import { CreateClothesDto, UpdateClothesDto } from './dto';

@Controller('clothes')
@ApiTags('Clothes') // Swaggerタグの設定
export class ClothesController {
  constructor(private readonly clothesService: ClothesService){} // 依存性の注入、ClothesServiceクラスのインスタンスを注入

  /**
   * @author ckcic
   * @description 商品の服(オプション)のイメージファイルを登録するメソッド
   *
   * @param file 服のイメージファイル
   * @param dto 服のイメージファイル登録DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard) // 検証済みのユーザーのみアクセス可能 - トークン発行済みのユーザー
  @ApiBearerAuth('access-token') // SwaggerでのJWTトークンキーの設定
  @Post("/create") // localhost:5000/clothes/create
  @UseInterceptors(FileInterceptor('file', multerClothesOptions)) // リクエストのファイル部分を処理
  @ApiOperation({
    summary: '商品の服のイメージファイルを登録',
    description: '商品の服のイメージファイルを登録するAPI'
  })
  @UsePipes(ValidationPipe) // dtoがバリデーションルールに従っているか検証
  async create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateClothesDto): Promise<void>{
    return this.clothesService.create(file ,dto)
  }


  /**
   * @author ckcic
   * @description 商品の服(オプション)のデータを全て取得するメソッド
   *
   * @param productId 商品の固有id
   * @param res データを返すためのパラメーター
   * @returns 全ての服のイメージファイルのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getAll/:productId") // localhost:5000/clothes/getAll/1
  @ApiOperation({
    summary: '商品の服のデータを全て取得',
    description: '商品の服のデータを全て取得するAPI'
  })
  async getAll(@Param('productId', ParseIntPipe) productId: number, @Res() res: Response){ // productIdが整数型なのか検証
    const data = await this.clothesService.getAll(productId)
    return res.json(data);
  }
 

  /**
   * @author ckcic
   * @description 商品の服(オプション)のイメージファイルを取得するメソッド
   *
   * @param id 服の固有id
   * @param res データを返すためのパラメーター
   * @returns 服のデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getOne/:id") // localhost:5000/clothes/getOne/1
  @ApiOperation({
    summary: '服のデータを取得',
    description: '服のデータを取得するAPI'
  })
  async getOne(@Param('id', ParseIntPipe) id:number,  @Res() res: Response){ // idが整数型なのか検証
    const data = await this.clothesService.getOne(id)
    return res.json(data);
  }


  /**
   * @author ckcic
   * @description 商品の服(オプション)のイメージファイルを更新するメソッド
   *
   * @param id 服の固有id
   * @param file 服のイメージファイル
   * @param dto 服のイメージファイル更新DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch("/update/:id") // localhost:5000/clothes/update/1
  @UseInterceptors(FileInterceptor('file', multerClothesOptions))
  @ApiOperation({
    summary: '服のデータを更新',
    description: '服のデータを更新するAPI'
  })
  @UsePipes(ValidationPipe)
  async update(@Param('id', ParseIntPipe) id:number, @UploadedFile() file: Express.Multer.File,  @Body() dto: UpdateClothesDto){ // idが整数型なのか検証
    return this.clothesService.update(id, file, dto)
  }


  /**
   * @author ckcic
   * @description 商品の服(オプション)のイメージファイルを削除するメソッド
   *
   * @param id 服の固有id
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete("/delete/:id") // localhost:5000/clothes/delete/1
  @ApiOperation({
    summary: '服のデータを削除',
    description: '服のデータを削除するAPI'
  })
  async delete(@Param('id', ParseIntPipe) id:number){ // idが整数型なのか検証
    return this.clothesService.delete(id)
  }
}
