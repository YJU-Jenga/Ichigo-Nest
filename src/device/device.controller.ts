import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DeviceService } from './device.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { CreateDeviceDto, SyncDeviceDto, UpdateDeviceDto } from './dto';
import { Device } from 'src/model/entity';

@Controller('device')
@ApiTags('Device') // Swaggerタグの設定
export class DeviceController {
  constructor(private readonly deviceService: DeviceService){} // 依存性の注入、DeviceServiceクラスのインスタンスを注入
  
  /**
   * @author ckcic
   * @description 販売するデバイスを登録するメソッド
   *
   * @param dto デバイス登録DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard) // 検証済みのユーザーのみアクセス可能 - トークン発行済みのユーザー
  @ApiBearerAuth('access-token') // SwaggerでのJWTトークンキーの設定
  @Post("/create") // localhost:5000/device/create
  @ApiOperation({
    summary: 'デバイスを登録',
    description: 'デバイスを登録するAPI'
  })
  @UsePipes(ValidationPipe) // dtoがバリデーションルールに従っているか検証
  async write(@Body() dto: CreateDeviceDto): Promise<void>{
    return this.deviceService.create(dto);
  }


  /**
   * @author ckcic
   * @description 登録されたデバイスを全て取得するメソッド
   *
   * @returns {Promise<Device[]>} 全ての登録されたデバイスのデータを戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getAll") // localhost:5000/device/getAll
  @ApiOperation({
    summary: '登録されたデバイスを全て取得',
    description: '登録されたデバイスを全て取得するAPI'
  })
  async getAll(): Promise<Device[]>{
    return this.deviceService.getAll();
  }


  /**
   * @author ckcic
   * @description デバイスをidで取得するメソッド
   *
   * @param id デバイスの固有id
   * @returns {Promise<Device>} デバイスのデータを戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getOne/:id")  // localhost:5000/device/getOne/1
  @ApiOperation({
    summary: 'デバイスをidで取得',
    description: 'デバイスをidで取得するAPI'
  })
  async getOne(@Param('id', ParseIntPipe) id:number ): Promise<Device>{ // idが整数型なのか検証
    return this.deviceService.getOne(id);
  }


  /**
   * @author ckcic
   * @description デバイスをMACアドレスで取得するメソッド
   *
   * @param id デバイスの固有id
   * @param res データを返すためのパラメーター
   * @returns デバイスのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getDevice/:macAddress") // localhost:5000/device/getOne/12:34:56:78:90:AB
  @ApiOperation({
    summary: 'デバイスをMACアドレスで取得',
    description: 'デバイスをMACアドレスで取得するAPI'
  })
  async getDevice(@Param('macAddress') macAddress:string,  @Res() res: Response){
    const data = await this.deviceService.getDevice(macAddress)
    return res.json(data);
  }
  
  
  /**
   * @author ckcic
   * @description ユーザーに連動されているデバイスを全て取得するメソッド
   *
   * @param id ユーザーの固有id
   * @param res データを返すためのパラメーター
   * @returns 全てのユーザーに連動されているデバイスのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/syncedDevice/:id") // localhost:5000/device/syncedDevice/1
  @ApiOperation({
    summary: 'ユーザーに連動されているデバイスを全て取得',
    description: 'ユーザーに連動されているデバイスを全て取得するAPI'
  })
  async syncedDevice(@Param('id', ParseIntPipe) id:number,  @Res() res: Response){ // idが整数型なのか検証
    const data = await this.deviceService.syncedDevice(id);
    return res.json(data);
  }
  

  /**
   * @author ckcic
   * @description デバイスを更新するメソッド
   *
   * @param id デバイスの固有id
   * @param dto デバイス更新DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch("/update/:id") // localhost:5000/device/update/1
  @ApiOperation({
    summary: 'デバイスを更新',
    description: 'デバイスを更新するAPI'
  })
  @UsePipes(ValidationPipe)
  async update(@Param('id', ParseIntPipe) id:number, @Body() dto: UpdateDeviceDto): Promise<void>{ // idが整数型なのか検証
    return this.deviceService.update(id, dto);
  }


  /**
   * @author ckcic
   * @description デバイスを連動するメソッド
   *
   * @param dto デバイス連動DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post("/sync") // localhost:5000/device/sync
  @ApiOperation({
    summary: 'デバイスを連動',
    description: 'デバイスを連動するAPI'
  })
  async sync(@Body() dto: SyncDeviceDto): Promise<void>{
    return this.deviceService.sync(dto);
  }


  /**
   * @author ckcic
   * @description デバイスを削除するメソッド
   *
   * @param id デバイスの固有id
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete("/delete/:id") // localhost:5000/device/delete/1
  @ApiOperation({
    summary: 'デバイスを削除',
    description: 'デバイスを削除するAPI'
  })
  async delete(@Param('id', ParseIntPipe) id:number): Promise<void>{ // idが整数型なのか検証
    return this.deviceService.delete(id);
  }
}
