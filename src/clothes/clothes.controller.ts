import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerClothesOptions } from 'src/utils/multer.option';
import { CreateClothesDto, UpdateClothesDto } from './dto';

@Controller('clothes')
@ApiTags('Clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService){}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post("/create")
  @UseInterceptors(FileInterceptor('file', multerClothesOptions))
  @ApiOperation({
    summary: '상품의 옷 파일 등록',
    description: '상품의 옷 파일 등록 API'
  })
  @UsePipes(ValidationPipe)
  async create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateClothesDto){
    return this.clothesService.create(file ,dto)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getAll/:productId")
  @ApiOperation({
    summary: '상품의 옷 파일 전체 조회',
    description: '상품의 옷 파일 전체 조회 API'
  })
  async getAll(@Param('productId', ParseIntPipe) productId: number, @Res() res: Response){
    const data = await this.clothesService.getAll(productId)
    return res.json(data);
  }
 
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getOne/:id")
  @ApiOperation({
    summary: '상품의 옷 파일 조회',
    description: '상품의 옷 파일 조회 API'
  })
  async getOne(@Param('id', ParseIntPipe) id:number,  @Res() res: Response){
    const data = await this.clothesService.getOne(id)
    return res.json(data);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch("/update/:id")
  @UseInterceptors(FileInterceptor('file', multerClothesOptions))
  @ApiOperation({
    summary: '상품의 옷 파일 수정',
    description: '상품의 옷 파일 수정 API'
  })
  async update(@Param('id', ParseIntPipe) id:number, @UploadedFile() file: Express.Multer.File,  @Body() dto: UpdateClothesDto){
    return this.clothesService.update(id, file, dto)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete("/delete/:id")
  @ApiOperation({
    summary: '상품의 옷 파일 삭제',
    description: '상품의 옷 파일 삭제 API'
  })
  async delete(@Param('id', ParseIntPipe) id:number){
    return this.clothesService.delete(id)
  }
}
