import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddProductDto, DeleteAddedProductDto, UpdateAddedProductDto } from './dto';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService){}

  @Get('/findOne/:id')
  async findOneCart(@Param('id', ParseIntPipe) id: number) {
    return await this.cartService.findOneCart(id);
  }
  
  @Post('/addProduct')
  @UsePipes(ValidationPipe)
  async addProduct(@Body() dto: AddProductDto) {
    return await this.cartService.addProduct(dto);
  }
  
  @Get('/findAllProducts/:id')
  async findAllProductInCart(@Param('id', ParseIntPipe) id: number) {
    return await this.cartService.findAllProductInCart(id);
  }
  
  @Patch('/updateAddedProdcut/:id')
  @UsePipes(ValidationPipe)
  async updateAddedProdcut(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAddedProductDto) {
    return await this.cartService.updateAddedProdcut(id, dto);
  }
  
  @Delete('/deleteAddedProdcut')
  async deleteAddedProdcut(@Body() dto: DeleteAddedProductDto) {
    return await this.cartService.deleteAddedProdcut(dto);
  }
}
