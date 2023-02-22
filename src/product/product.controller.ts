import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
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
  async create (@UploadedFile() file: Express.Multer.File, @Body() dto:CreateProductDto) {
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
  async update (@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File, @Body() dto:UpdateProductDto) {
    return await this.productService.update(id, file, dto);
  }
  
  @Delete('/delete/:id')
  async delete (@Param('id', ParseIntPipe) id: number) {
    return await this.productService.delete(id);
  }
}
