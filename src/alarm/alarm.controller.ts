import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AlarmService } from './alarm.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards';
import { CreateAlarmDto, UpdateAlarmDto } from './dto';

@Controller('alarm')
@ApiTags('Alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService){}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post("/create")
  @ApiOperation({
    summary: '알람 등록',
    description: '알람 등록 API'
  })
  @UsePipes(ValidationPipe)
  async create(@Body() dto: CreateAlarmDto){
    return this.alarmService.create(dto)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getAll/:user_id")
  @ApiOperation({
    summary: '유저의 알람 전체 조회',
    description: '유저의 알람 전체 조회 API'
  })
  async getAll(@Param('user_id', ParseIntPipe) user_id: number, @Res() res: Response){
    const data = await this.alarmService.getAll(user_id)
    return res.json(data);
  }
 
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getOne/:id")
  @ApiOperation({
    summary: '알람 조회',
    description: '알람 조회 API'
  })
  async getOne(@Param('id', ParseIntPipe) id:number,  @Res() res: Response){
    const data = await this.alarmService.getOne(id)
    return res.json(data);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch("/update/:id")
  @ApiOperation({
    summary: '알람 정보 수정',
    description: '알람 수정 API'
  })
  async update(@Param('id', ParseIntPipe) id:number, @Body() dto: UpdateAlarmDto){
    return this.alarmService.update(id, dto)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete("/delete/:id")
  @ApiOperation({
    summary: '알람 삭제',
    description: '알람 삭제 API'
  })
  async delete(@Param('id', ParseIntPipe) id:number){
    return this.alarmService.delete(id)
  }
}
