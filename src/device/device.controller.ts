import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DeviceService } from './device.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { CreateDeviceDto, SyncDeviceDto, UpdateDeviceDto } from './dto';

@Controller('device')
@ApiTags('Device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService){}
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post("/create")
  @ApiOperation({
    summary: '기기 등록',
    description: '기기 등록 API'
  })
  @UsePipes(ValidationPipe)
  async write(@Body() dto: CreateDeviceDto){
    return this.deviceService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getAll")
  @ApiOperation({
    summary: '등록된 기기 전체 조회',
    description: '등록된 기기 전체 조회 API'
  })
  async getAll(){
    return this.deviceService.getAll();
  }

  // id로 조회
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getOne/:id")
  @ApiOperation({
    summary: '기기 id 조회',
    description: '기기 id 조회 API'
  })
  async getOne(@Param('id', ParseIntPipe) id:number ){
    return this.deviceService.getOne(id);
  }

  // 맥주소로 조회
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getDevice/:macAddress")
  @ApiOperation({
    summary: '기기 맥주소 조회',
    description: '기기 맥주소 조회 API'
  })
  async getDevice(@Param('macAddress') macAddress:string,  @Res() res: Response){
    const data = await this.deviceService.getDevice(macAddress)
    return res.json(data);
  }
  
  // 유저아이디로 조회
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/syncedDevice/:id")
  @ApiOperation({
    summary: '유저에게 연동된 기기 조회',
    description: '유저에게 연동된 기기 API'
  })
  async syncedDevice(@Param('id', ParseIntPipe) id:number,  @Res() res: Response){
    const data = await this.deviceService.syncedDevice(id);
    return res.json(data);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch("/update/:id")
  @ApiOperation({
    summary: '기기 정보 수정',
    description: '기기 수정 API'
  })
  async update(@Param('id', ParseIntPipe) id:number, @Body() dto: UpdateDeviceDto){
    return this.deviceService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post("/sync")
  @ApiOperation({
    summary: '기기 연동',
    description: '기기 연동 API'
  })
  async sync(@Body() dto: SyncDeviceDto){
    return this.deviceService.sync(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete("/delete/:id")
  @ApiOperation({
    summary: '기기 삭제',
    description: '기기 삭제 API'
  })
  async delete(@Param('id', ParseIntPipe) id:number){
    return this.deviceService.delete(id);
  }
}
