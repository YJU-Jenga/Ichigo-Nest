import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AlarmService } from './alarm.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards';
import { CreateAlarmDto, UpdateAlarmDto } from './dto';

@Controller('alarm')
@ApiTags('Alarm') // Swaggerタグの設定
export class AlarmController {
  constructor(private readonly alarmService: AlarmService){} // 依存性の注入、AlarmServiceクラスのインスタンスを注入

  /**
   * @author ckcic
   * @description アラームを登録するメソッド
   *
   * @param dto アラーム登録DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard) // 検証済みのユーザーのみアクセス可能 - トークン発行済みのユーザー
  @ApiBearerAuth('access-token') // SwaggerでのJWTトークンキーの設定
  @Post("/create") // localhost:5000/alarm/create
  @ApiOperation({
    summary: 'アラームを登録',
    description: 'アラームを登録するAPI'
  })
  @UsePipes(ValidationPipe) // dtoがバリデーションルールに従っているか検証
  async create(@Body() dto: CreateAlarmDto): Promise<void>{
    return this.alarmService.create(dto)
  }


  /**
   * @author ckcic
   * @description ユーザーが登録したアラームを全て取得するメソッド
   *
   * @param user_id ユーザーの固有id
   * @param res データを返すためのパラメーター
   * @returns 全てのユーザーが登録したアラームのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getAll/:user_id")  // localhost:5000/alarm/getAll/1
  @ApiOperation({
    summary: 'ユーザーが登録したアラームを全て取得',
    description: 'ユーザーが登録したアラームを全て取得するAPI'
  })
  async getAll(@Param('user_id', ParseIntPipe) user_id: number, @Res() res: Response){ // user_idが整数型なのか検証
    const data = await this.alarmService.getAll(user_id)
    return res.json(data);
  }
 

  /**
   * @author ckcic
   * @description アラームを取得するメソッド
   *
   * @param id アラームの固有id
   * @param res データを返すためのパラメーター
   * @returns アラームのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get("/getOne/:id") // localhost:5000/alarm/getOne/1
  @ApiOperation({
    summary: 'アラームを取得',
    description: 'アラームを取得するAPI'
  })
  async getOne(@Param('id', ParseIntPipe) id:number,  @Res() res: Response){ // idが整数型なのか検証
    const data = await this.alarmService.getOne(id)
    return res.json(data);
  }


  /**
   * @author ckcic
   * @description アラームを更新するメソッド
   *
   * @param id アラームの固有id
   * @param dto アラーム更新DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch("/update/:id") // localhost:5000/alarm/update/1
  @ApiOperation({
    summary: 'アラームを更新',
    description: 'アラームを更新するAPI'
  })
  @UsePipes(ValidationPipe)
  async update(@Param('id', ParseIntPipe) id:number, @Body() dto: UpdateAlarmDto): Promise<void>{ // idが整数型なのか検証
    return this.alarmService.update(id, dto)
  }


  /**
   * @author ckcic
   * @description アラームを削除するメソッド
   *
   * @param id アラームの固有id
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete("/delete/:id") // localhost:5000/alarm/delete/1
  @ApiOperation({
    summary: 'アラームを削除',
    description: 'アラームを削除するAPI'
  })
  async delete(@Param('id', ParseIntPipe) id:number): Promise<void>{ // idが整数型なのか検証
    return this.alarmService.delete(id)
  }
}
