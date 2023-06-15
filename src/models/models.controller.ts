import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { ModelsService } from './models.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerModelsOptions } from 'src/utils/multer.option';
import { CreateModelsDto, UpdateModelsDto } from './dto';

@Controller('models')
@ApiTags('Models') // Swaggerタグの設定
export class ModelsController {
  constructor(private readonly modelsService: ModelsService){} // 依存性の注入、ModelsServiceクラスのインスタンスを注入

  /**
   * @author ckcic
   * @description 商品の3Dモデルファイルを登録するメソッド
   *
   * @param file 3Dモデルファイル
   * @param dto 3Dモデルファイル登録DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard) // 検証済みのユーザーのみアクセス可能 - トークン発行済みのユーザー
  @ApiBearerAuth('access-token') // SwaggerでのJWTトークンキーの設定
  @Post("/create") // localhost:5000/models/create
  @UseInterceptors(FileInterceptor('file', multerModelsOptions)) // リクエストのファイル部分を処理
  @ApiOperation({
    summary: '商品の3Dモデルファイルを登録',
    description: '商品の3Dモデルファイルを登録するAPI'
  })
  @UsePipes(ValidationPipe) // dtoがバリデーションルールに従っているか検証
  async create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateModelsDto): Promise<void>{
    return this.modelsService.create(file ,dto)
  }


  /**
   * @author ckcic
   * @description 商品の3Dモデルファイルを全て取得するメソッド
   *
   * @param productId 商品の固有id
   * @param res データを返すためのパラメーター
   * @returns 全ての3DモデルファイルのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getAll/:productId") // localhost:5000/models/getAll/1
  @ApiOperation({
    summary: '商品の3Dモデルファイルを全て取得',
    description: '商品の3Dモデルファイルを全て取得するAPI'
  })
  async getAll(@Param('productId', ParseIntPipe) productId: number, @Res() res: Response){ // productIdが整数型なのか検証
    const data = await this.modelsService.getAll(productId)
    return res.json(data);
  }
 

  /**
   * @author ckcic
   * @description 商品の3Dモデルファイルを取得するメソッド
   *
   * @param productId 商品の固有id
   * @param res データを返すためのパラメーター
   * @returns 商品の3DモデルファイルのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getModel/:productId") // localhost:5000/models/getModel/1
  @ApiOperation({
    summary: '商品の3Dモデルファイルを取得',
    description: '商品の3Dモデルファイルを取得するAPI'
  })
  async getModel(@Param('productId', ParseIntPipe) productId:number,  @Res() res: Response){ // productIdが整数型なのか検証
    const data = await this.modelsService.getModel(productId)
    return res.json(data);
  }


  /**
   * @author ckcic
   * @description 商品の3Dモデルファイルを更新するメソッド
   *
   * @param id 3Dモデルファイルの固有id
   * @param file 3Dモデルファイル
   * @param dto 3Dモデルファイル更新DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch("/update/:id") // localhost:5000/models/update/1
  @UseInterceptors(FileInterceptor('file', multerModelsOptions))
  @ApiOperation({
    summary: '3Dモデルファイルを更新',
    description: '3Dモデルファイルを更新するAPI'
  })
  @UsePipes(ValidationPipe)
  async update(@Param('id', ParseIntPipe) id:number, @UploadedFile() file: Express.Multer.File,  @Body() dto: UpdateModelsDto): Promise<void>{ // idが整数型なのか検証
    return this.modelsService.update(id, file, dto)
  }


  /**
   * @author ckcic
   * @description 商品の3Dモデルファイルを削除するメソッド
   *
   * @param id 3Dモデルファイルの固有id
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete("/delete/:id") // localhost:5000/models/delete/1
  @ApiOperation({
    summary: '3Dモデルファイルを削除',
    description: '3Dモデルファイルを削除するAPI'
  })
  async delete(@Param('id', ParseIntPipe) id:number): Promise<void>{ // idが整数型なのか検証
    return this.modelsService.delete(id)
  }
}
