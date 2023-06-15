import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { PurchaseOrderService } from './purchase_order.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { PurchaseOrder } from 'src/model/entity';

@Controller('order')
@ApiTags('Order') // Swaggerタグの設定
export class PurchaseOrderController {
  constructor(private readonly orderService: PurchaseOrderService){} // 依存性の注入、PurchaseOrderServiceクラスのインスタンスを注入

  /**
   * @author ckcic
   * @description ユーザー全体を取得するメソッド
   *
   * @param dto 注文作成DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard) // 検証済みのユーザーのみアクセス可能 - トークン発行済みのユーザー
  @ApiBearerAuth('access-token') // SwaggerでのJWTトークンキーの設定
  @Post('/create') // localhost:5000/order/create
  @ApiOperation({
    summary: '注文作成',
    description: '注文を作成するAPI',
  })
  @UsePipes(ValidationPipe)
  async createOrder(@Body() dto: CreateOrderDto): Promise<void> {
    return await this.orderService.createOrder(dto);
  }
  
  /**
   * @author ckcic
   * @description 全ての注文を取得するメソッド
   *
   * @returns {Promise<PurchaseOrder[]>} 全ての注文のデータを戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/findAll') // localhost:5000/order/findAll
  @ApiOperation({
    summary: '全ての注文の取得',
    description: '全ての注文を取得するAPI',
  })
  async findAllOrder(): Promise<PurchaseOrder[]> {
    return await this.orderService.findAllOrder();
  }


  /**
   * @author ckcic
   * @description ユーザーの全ての注文を取得するメソッド
   *
   * @param id　ユーザーの固有ID
   * @returns {Promise<PurchaseOrder[]>} ユーザーの全ての注文のデータを戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/findAll/:id') // localhost:5000/order/findAll/1
  @ApiOperation({
    summary: 'ユーザーの全ての注文の取得',
    description: 'ユーザーの全ての注文を取得するAPI',
  })
  async findAllUserOrder(@Param('id', ParseIntPipe) id: number): Promise<PurchaseOrder[]> { // idが整数型なのか検証
    return await this.orderService.findAllUserOrder(id);
  }
  

  /**
   * @author ckcic
   * @description 注文のデータを取得するメソッド
   *
   * @param id　注文の固有ID
   * @returns {Promise<PurchaseOrder>} 注文のデータを戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/findOne/:id') // localhost:5000/order/findOne/1
  @ApiOperation({
    summary: '注文のデータを取得',
    description: '注文のデータを取得するAPI',
  })
  async findOneOrder(@Param('id', ParseIntPipe) id: number): Promise<PurchaseOrder> { // idが整数型なのか検証
    return await this.orderService.findOneOrder(id);
  }
  

  /**
   * @author ckcic
   * @description 注文のデータを更新するメソッド
   *
   * @param id　注文の固有ID
   * @param dto　注文更新DTO
   * @returns {Promise<void>} 
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('/update/:id') // localhost:5000/order/update/1
  @ApiOperation({
    summary: '注文のデータを更新',
    description: '注文のデータを更新するAPI',
  })
  @UsePipes(ValidationPipe) // dtoがバリデーションルールに従っているか検証
  async updateOrder(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrderDto): Promise<void> { // idが整数型なのか検証
    return await this.orderService.updateOrder(id, dto);
  }


  /**
   * @author ckcic
   * @description 注文のデータを削除するメソッド
   *
   * @param id　注文の固有ID
   * @returns {Promise<void>} 
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete('/delete/:id') // localhost:5000/order/delete/1
  @ApiOperation({
    summary: '注文のデータを削除',
    description: '注文のデータを削除するAPI',
  })
  async deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<void> { // idが整数型なのか検証
    return await this.orderService.deleteOrder(id);
  }
}