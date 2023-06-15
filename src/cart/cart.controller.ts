import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddProductDto, AddProductWithOptionDto, DeleteAddedProductDto, UpdateAddedProductDto, UpdateProductWithOptionDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { Response } from 'express';
import { Cart } from 'src/model/entity';

@Controller('cart')
@ApiTags('Cart') // Swaggerタグの設定
export class CartController {
  constructor(private readonly cartService: CartService){} // 依存性の注入、CartServiceクラスのインスタンスを注入

  /**
   * @author ckcic
   * @description カートを取得するメソッド
   *
   * @param id カートの固有id
   * @returns {Promise<Cart>} カートのデータを戻り値として返す
   */
  @UseGuards(JwtAuthGuard) // 検証済みのユーザーのみアクセス可能 - トークン発行済みのユーザー
  @ApiBearerAuth('access-token') // SwaggerでのJWTトークンキーの設定
  @Get('/findOne/:id') // localhost:5000/cart/findOne/1
  @ApiOperation({
    summary: 'カートを取得',
    description: 'カートを取得するAPI'
  })
  async findOneCart(@Param('id', ParseIntPipe) id: number): Promise<Cart> { // idが整数型なのか検証
    return await this.cartService.findOneCart(id);
  }


  /**
   * @author ckcic
   * @description ユーザーのカートの固有idを取得するメソッド
   *
   * @param id ユーザーの固有id
   * @param res データを返すためのパラメーター
   * @returns 全ての服のイメージファイルのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/findCartId/:id') // localhost:5000/cart/findCartId/1
  @ApiOperation({
    summary: 'ユーザーのカートの固有idを取得',
    description: 'ユーザーのカートの固有idを取得するAPI'
  })
  async findCartId(@Param('id', ParseIntPipe) id: number, @Res() res:Response) { // idが整数型なのか検証
    try {
      const data = await this.cartService.findCartId(id);
      return res.json(data.id);
    } catch (error) {
      console.log(error);
    }
  }
  

  /**
   * @author ckcic
   * @description カートに商品を追加するメソッド
   *
   * @param dto カートに商品追加DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/addProduct') // localhost:5000/cart/addProduct
  @ApiOperation({
    summary: 'カートに商品を追加',
    description: 'カートに商品を追加するAPI'
  })
  @UsePipes(ValidationPipe) // dtoがバリデーションルールに従っているか検証
  async addProduct(@Body() dto: AddProductDto): Promise<void> {
    return await this.cartService.addProduct(dto);
  }


  /**
   * @author ckcic
   * @description カートに商品とオプションを追加するメソッド
   *
   * @param dto カートに商品とオプション追加DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/addProductWithOption') // localhost:5000/cart/addProductWithOption
  @ApiOperation({
    summary: 'カートに商品とオプションを追加',
    description: 'カートに商品とオプションを追加するAPI'
  })
  @UsePipes(ValidationPipe)
  async addProductWithOption(@Body() dto: AddProductWithOptionDto): Promise<void> {
    return await this.cartService.addProductWithOption(dto);
  }
  

  /**
   * @author ckcic
   * @description カートの中にいる商品を全て取得するメソッド
   *
   * @param id カートの固有id
   * @returns {Promise<Cart[]>} カートの中にいる商品全てのデータを戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/findAllProducts/:id') // localhost:5000/cart/findAllProducts/1
  @ApiOperation({
    summary: 'カートの中にいる商品を全て取得',
    description: 'カートの中にいる商品を全て取得するAPI'
  })
  async findAllProductInCart(@Param('id', ParseIntPipe) id: number): Promise<Cart[]> { // idが整数型なのか検証
    return await this.cartService.findAllProductInCart(id);
  }
  

  /**
   * @author ckcic
   * @description カートの中にいる商品とオプションを更新するメソッド
   *
   * @param id カートの中にいる商品の固有id
   * @param dto カートの中にいる商品とオプション更新DTO
   * @returns {Promise<void>} 
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('/updateProductWithOption/:id') // localhost:5000/cart/updateProductWithOption/1
  @ApiOperation({
    summary: 'カートの中にいる商品とオプションを更新',
    description: 'カートの中にいる商品とオプションを更新するAPI (配列を空にすると削除できるようにし、オプションがないときに修正しても追加できるようにする)'
  })
  @UsePipes(ValidationPipe)
  async updateProductWithOption(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductWithOptionDto): Promise<void> { // idが整数型なのか検証
    return await this.cartService.updateProductWithOption(id, dto);
  }


  /**
   * @author ckcic
   * @description カートの中にいる商品を更新するメソッド
   *
   * @param id カートの中にいる商品の固有id
   * @param dto カートの中にいる商品更新DTO
   * @returns {Promise<void>} 
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('/updateAddedProduct/:id') // localhost:5000/cart/updateAddedProduct/1
  @ApiOperation({
    summary: 'カートの中にいる商品を更新',
    description: 'カートの中にいる商品を更新するAPI'
  })
  @UsePipes(ValidationPipe)
  async updateAddedProduct(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAddedProductDto): Promise<void> { // idが整数型なのか検証
    return await this.cartService.updateAddedProduct(id, dto);
  }
  

  /**
   * @author ckcic
   * @description カートの中にいる商品を削除するメソッド
   *
   * @param dto カートの中にいる商品削除DTO
   * @returns {Promise<void>} 
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'カートの中にいる商品を削除',
    description: 'カートの中にいる商品を削除するAPI'
  })
  @Delete('/deleteAddedProduct') // localhost:5000/cart/deleteAddedProduct
  async deleteAddedProduct(@Body() dto: DeleteAddedProductDto): Promise<void> {
    return await this.cartService.deleteAddedProduct(dto);
  }
}
