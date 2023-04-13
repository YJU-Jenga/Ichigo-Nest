import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { format } from 'path';
import { multerDiskOptions } from '../utils/multer.option';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService){}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/create')
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: '상품 등록',
    description: '상품 등록 API',
  })
  @UseInterceptors(FileInterceptor('file', multerDiskOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { // 👈 this property
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
  async create (@UploadedFile() file: Express.Multer.File, @Body() dto:CreateProductDto) {
    dto.name = JSON.parse(dto.name).name
    dto.price = JSON.parse(dto.price.toString()).price
    dto.description = JSON.parse(dto.description).description
    dto.stock = JSON.parse(dto.stock.toString()).stock
    dto.type = JSON.parse(dto.type.toString()).type
    return await this.productService.create(file, dto);
  }
  
  @Get('/getAll')
  @ApiOperation({
    summary: '상품 전체 조회',
    description: '상품 전체 조회 API',
  })
  async findAll () {
    return await this.productService.findAll();
  }
  
  @Get('/getOne/:id')
  @ApiOperation({
    summary: '상품 조회',
    description: '상품 조회 API',
  })
  async findOne (@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findOne(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('/update/:id')
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: '상품 수정',
    description: '상품 수정 API',
  })
  @UseInterceptors(FileInterceptor('file', multerDiskOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { // 👈 this property
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
  async update (@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File, @Body() dto:UpdateProductDto) {
    dto.name = JSON.parse(dto.name).name
    dto.price = JSON.parse(dto.price.toString()).price
    dto.description = JSON.parse(dto.description).description
    dto.stock = JSON.parse(dto.stock.toString()).stock
    dto.type = JSON.parse(dto.type.toString()).type
    return await this.productService.update(id, file, dto);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '상품 삭제',
    description: '상품 삭제 API',
  })
  @Delete('/delete/:id')
  async delete (@Param('id', ParseIntPipe) id: number) {
    return await this.productService.delete(id);
  }
}
