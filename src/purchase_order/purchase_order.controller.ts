import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { PurchaseOrderService } from './purchase_order.service';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('order')
@ApiTags('Order')
export class PurchaseOrderController {
  constructor(private readonly orderService: PurchaseOrderService){}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/create')
  @ApiOperation({
    summary: '주문 생성',
    description: '주문 생성 API',
  })
  @UsePipes(ValidationPipe)
  async createOrder(@Body() dto: CreateOrderDto) {
    return await this.orderService.createOrder(dto);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/findAll')
  @ApiOperation({
    summary: '전체 주문 조회',
    description: '전체 주문 조회 API',
  })
  async findAllOrder() {
    return await this.orderService.findAllOrder();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/findAll/:id')
  @ApiOperation({
    summary: '해당 유저의 전체 주문 조회',
    description: '해당 유저의 전체 주문 조회 API',
  })
  async findAllUserOrder(@Param('id', ParseIntPipe) id: number) {
    return await this.orderService.findAllUserOrder(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/findOne/:id')
  @ApiOperation({
    summary: '주문 조회',
    description: '주문 조회 API',
  })
  async findOneOrder(@Param('id', ParseIntPipe) id: number) {
    return await this.orderService.findOneOrder(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('/update/:id')
  @ApiOperation({
    summary: '주문 수정',
    description: '주문 수정 API',
  })
  @UsePipes(ValidationPipe)
  async updateOrder(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrderDto) {
    return await this.orderService.updateOrder(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete('/delete/:id')
  @ApiOperation({
    summary: '주문 삭제',
    description: '주문 삭제 API',
  })
  async deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return await this.orderService.deleteOrder(id);
  }
}