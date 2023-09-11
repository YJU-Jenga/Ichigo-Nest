import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { multerDiskOptions } from '../utils/multer.option';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { Product } from 'src/model/entity';

@Controller('product')
@ApiTags('Product') // Swaggerタグの設定
export class ProductController {
  constructor(private readonly productService: ProductService){} // 依存性の注入、ProductServiceクラスのインスタンスを注入

  /**
   * @author ckcic
   * @description 商品をショッピングモールに登録するメソッド
   *
   * @param file イメージファイル
   * @param dto 商品登録DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard) // 検証済みのユーザーのみアクセス可能 - トークン発行済みのユーザー
  @ApiBearerAuth('access-token') // SwaggerでのJWTトークンキーの設定
  @Post('/create') // localhost:5000/product/create
  @UsePipes(ValidationPipe) // dtoがバリデーションルールに従っているか検証
  @ApiOperation({
    summary: '商品をショッピングモールに登録',
    description: '商品をショッピングモールに登録するAPI',
  })
  @UseInterceptors(FileInterceptor('file', multerDiskOptions)) // リクエストのファイル部分を処理
  // @UseInterceptors(FileInterceptor('file')) // リクエストのファイル部分を処理
  @ApiConsumes('multipart/form-data') // Swaggerでの設定:リクエストのContent-Typeをmultipart/form-dataとして指定します。
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type:'string',
          format: 'binary'
        },
        name: {
          type: 'string'
        },
        price: {
          type: 'number'

        },
        description: {
          type: 'string'
        },
        stock: {
          type: 'number'
        },
        type: {
          type: 'boolean'
        },
      },
    },
  })
  async create (@UploadedFile() file: Express.Multer.File, @Body() dto:CreateProductDto): Promise<void> {
    dto.name = JSON.parse(dto.name).name
    dto.price = JSON.parse(dto.price.toString()).price
    dto.description = JSON.parse(dto.description).description
    dto.stock = JSON.parse(dto.stock.toString()).stock
    dto.type = JSON.parse(dto.type.toString()).type
    return await this.productService.create(file, dto);
  }
  

  /**
   * @author ckcic
   * @description 全ての商品を取得するメソッド
   *
   * @returns {Promise<Product[]>} 全ての商品のデータを戻り値として返す
   */
  @Get('/getAll') // localhost:5000/product/getAll
  @ApiOperation({
    summary: '全ての商品を取得',
    description: '全ての商品を取得するAPI',
  })
  async findAll (): Promise<Product[]> {
    return await this.productService.findAll();
  }
  

  /**
   * @author ckcic
   * @description 商品のデータを取得するメソッド
   *
   * @param id 商品の固有id
   * @returns {Promise<Product>} 商品のデータを戻り値として返す
   */
  @Get('/getOne/:id') // localhost:5000/product/getOne/1
  @ApiOperation({
    summary: '商品のデータを取得',
    description: '商品のデータを取得するAPI',
  })
  async findOne (@Param('id', ParseIntPipe) id: number): Promise<Product> { // idが整数型なのか検証
    return await this.productService.findOne(id);
  }
  
  /**
   * @author ckcic
   * @description 商品のデータを更新するメソッド
   *
   * @param id 商品の固有id
   * @param file イメージファイル
   * @param dto 商品更新DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('/update/:id') // localhost:5000/product/update/1
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: '商品のデータを更新',
    description: '商品のデータを更新するAPI',
  })
  @UseInterceptors(FileInterceptor('file', multerDiskOptions))
  // @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { 
          type:'string',
          format: 'binary'
        },
        name: {
          type: 'string'
        },
        price: {
          type: 'number'

        },
        description: {
          type: 'string'
        },
        stock: {
          type: 'number'
        },
        type: {
          type: 'boolean'
        },
      },
    },
  })
  async update (@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File, @Body() dto:UpdateProductDto): Promise<void> {
    dto.name = JSON.parse(dto.name).name
    dto.price = JSON.parse(dto.price.toString()).price
    dto.description = JSON.parse(dto.description).description
    dto.stock = JSON.parse(dto.stock.toString()).stock
    dto.type = JSON.parse(dto.type.toString()).type
    return await this.productService.update(id, file, dto);
  }
  

  /**
   * @author ckcic
   * @description 商品のデータを削除するメソッド
   *
   * @param id 商品の固有id
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '商品のデータを削除',
    description: '商品のデータを削除するAPI',
  })
  @Delete('/delete/:id') // localhost:5000/product/delete/1
  async delete (@Param('id', ParseIntPipe) id: number): Promise<void> { // idが整数型なのか検証
    return await this.productService.delete(id);
  }
}
