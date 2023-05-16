import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { MusicService } from './music.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerAudioOptions } from 'src/utils/multer.option';
import { CreateMusicDto, UpdateMusicDto } from './dto';

@Controller('music')
@ApiTags('Music')
export class MusicController {
  constructor(private readonly musicService: MusicService){}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post("/create")
  @UseInterceptors(FileInterceptor('file', multerAudioOptions))
  @ApiOperation({
    summary: '알람등록용 파일 등록',
    description: '알람등록용 파일 등록 API'
  })
  @UsePipes(ValidationPipe)
  async create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateMusicDto){
    console.log(file);
    console.log(dto);
    return this.musicService.create(file ,dto)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getAll/:user_id")
  @ApiOperation({
    summary: '유저의 알람등록용 파일 전체 조회',
    description: '유저의 알람등록용 파일 전체 조회 API'
  })
  async getAll(@Param('user_id', ParseIntPipe) user_id: number, @Res() res: Response){
    const data = await this.musicService.getAll(user_id)
    return res.json(data);
  }
 
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getOne/:id")
  @ApiOperation({
    summary: '알람등록용 파일 조회',
    description: '알람등록용 파일 조회 API'
  })
  async getOne(@Param('id', ParseIntPipe) id:number,  @Res() res: Response){
    const data = await this.musicService.getOne(id)
    return res.json(data);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch("/update/:id")
  @UseInterceptors(FileInterceptor('file', multerAudioOptions))
  @ApiOperation({
    summary: '알람등록용 파일 수정',
    description: '알람등록용 파일 수정 API'
  })
  async update(@Param('id', ParseIntPipe) id:number, @UploadedFile() file: Express.Multer.File,  @Body() dto: UpdateMusicDto){
    return this.musicService.update(id, file, dto)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete("/delete/:id")
  @ApiOperation({
    summary: '알람등록용 파일 삭제',
    description: '알람등록용 파일 삭제 API'
  })
  async delete(@Param('id', ParseIntPipe) id:number){
    return this.musicService.delete(id)
  }
}
