import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddProductDto, AddProductWithOptionDto, DeleteAddedProductDto, UpdateAddedProductDto, UpdateProductWithOptionDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { Response } from 'express';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService){}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/findOne/:id')
  @ApiOperation({
    summary: '장바구니 조회',
    description: '장바구니 조회 API'
  })
  async findOneCart(@Param('id', ParseIntPipe) id: number) {
    return await this.cartService.findOneCart(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/findCartId/:id')
  @ApiOperation({
    summary: '유저의 장바구니 id 조회',
    description: '장바구니 id 조회 API'
  })
  async findCartId(@Param('id', ParseIntPipe) id: number, @Res() res:Response) {
    try {
      const data = await this.cartService.findCartId(id);
      return res.json(data.id);
    } catch (error) {
      console.log(error);
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/addProduct')
  @ApiOperation({
    summary: '장바구니에 상품추가',
    description: '장바구니에 상품추가 API'
  })
  @UsePipes(ValidationPipe)
  async addProduct(@Body() dto: AddProductDto) {
    return await this.cartService.addProduct(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/addProductWithOption')
  @ApiOperation({
    summary: '장바구니에 상품과 옵션 추가',
    description: '장바구니에 상품과 옵션 추가 API'
  })
  @UsePipes(ValidationPipe)
  async addProductWithOption(@Body() dto: AddProductWithOptionDto) {
    return await this.cartService.addProductWithOption(dto);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/findAllProducts/:id')
  @ApiOperation({
    summary: '장바구니안 상품 전체 조회',
    description: '장바구니안 상품 전체 조회 API'
  })
  async findAllProductInCart(@Param('id', ParseIntPipe) id: number) {
    return await this.cartService.findAllProductInCart(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('/updateProductWithOption/:id')
  @ApiOperation({
    summary: '장바구니안 상품옵션 수정',
    description: '장바구니안 상품옵션 수정 API (배열을 비우면 삭제도 하고, 옵션이 없었을 때 수정 해도, 추가가 되게함)'
  })
  @UsePipes(ValidationPipe)
  async updateProductWithOption(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductWithOptionDto) {
    return await this.cartService.updateProductWithOption(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('/updateAddedProduct/:id')
  @ApiOperation({
    summary: '장바구니안 상품 수정',
    description: '장바구니안 상품 수정 API'
  })
  @UsePipes(ValidationPipe)
  async updateAddedProduct(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAddedProductDto) {
    return await this.cartService.updateAddedProduct(id, dto);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '장바구니안 상품 삭제',
    description: '장바구니안 상품 삭제 API'
  })
  @Delete('/deleteAddedProduct')
  async deleteAddedProduct(@Body() dto: DeleteAddedProductDto) {
    return await this.cartService.deleteAddedProduct(dto);
  }
}
