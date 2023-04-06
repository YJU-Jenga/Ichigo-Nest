import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { format } from 'path';
import { multerDiskOptions } from '../utils/multer.option';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService){}

  @Post('/create')
  @UsePipes(ValidationPipe)
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
  async findAll () {
    return await this.productService.findAll();
  }
  
  @Get('/getOne/:id')
  async findOne (@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findOne(id);
  }
  
  @Patch('/update/:id')
  @UsePipes(ValidationPipe)
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
  
  @Delete('/delete/:id')
  async delete (@Param('id', ParseIntPipe) id: number) {
    return await this.productService.delete(id);
  }
}
