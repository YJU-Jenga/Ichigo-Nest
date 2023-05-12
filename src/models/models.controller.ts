import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { ModelsService } from './models.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerModelsOptions } from 'src/utils/multer.option';
import { CreateModelsDto, UpdateModelsDto } from './dto';

@Controller('models')
@ApiTags('Models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService){}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post("/create")
  @UseInterceptors(FileInterceptor('file', multerModelsOptions))
  @ApiOperation({
    summary: '상품의 모델 파일 등록',
    description: '상품의 모델 파일 등록 API'
  })
  @UsePipes(ValidationPipe)
  async create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateModelsDto){
    return this.modelsService.create(file ,dto)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getAll/:productId")
  @ApiOperation({
    summary: '상품의 모델 파일 전체 조회',
    description: '상품의 모델 파일 전체 조회 API'
  })
  async getAll(@Param('productId', ParseIntPipe) productId: number, @Res() res: Response){
    const data = await this.modelsService.getAll(productId)
    return res.json(data);
  }
 
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getOne/:id")
  @ApiOperation({
    summary: '상품의 모델 파일 조회',
    description: '상품의 모델 파일 조회 API'
  })
  async getOne(@Param('id', ParseIntPipe) id:number,  @Res() res: Response){
    const data = await this.modelsService.getOne(id)
    return res.json(data);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch("/update/:id")
  @UseInterceptors(FileInterceptor('file', multerModelsOptions))
  @ApiOperation({
    summary: '상품의 모델 파일 수정',
    description: '상품의 모델 파일 수정 API'
  })
  async update(@Param('id', ParseIntPipe) id:number, @UploadedFile() file: Express.Multer.File,  @Body() dto: UpdateModelsDto){
    return this.modelsService.update(id, file, dto)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete("/delete/:id")
  @ApiOperation({
    summary: '상품의 모델 파일 삭제',
    description: '상품의 모델 파일 삭제 API'
  })
  async delete(@Param('id', ParseIntPipe) id:number){
    return this.modelsService.delete(id)
  }
}
