import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService){}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createOrder(@Body() dto: CreateOrderDto) {
    return await this.orderService.createOrder(dto);
  }
  
  @Get('/findAll')
  async findAllOrder() {
    return await this.orderService.findAllOrder();
  }
  
  @Get('/findOne/:id')
  async findOneOrder(@Param('id', ParseIntPipe) id: number) {
    return await this.orderService.findOneOrder(id);
  }
  
  @Patch('/update/:id')
  @UsePipes(ValidationPipe)
  async updateOrder(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrderDto) {
    return await this.orderService.updateOrder(id, dto);
  }

  @Delete('/delete/:id')
  async deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return await this.orderService.deleteOrder(id);
  }
}
