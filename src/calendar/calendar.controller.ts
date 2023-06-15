import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe, UseGuards, Request, Res, HttpStatus, Req} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto, SearchCalendarDto, SearchIdCalendarDto, UpdateCalendarDto } from "./dto";
import { Calendar } from 'src/model/entity';
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { Response } from 'express';

@Controller('calendar')
@ApiTags('Calendar') // Swaggerタグの設定
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {} // 依存性の注入、CalendarServiceクラスのインスタンスを注入

  /**
   * @author ckcic
   * @description スケジュールを作成するメソッド
   *
   * @param dto スケジュール作成DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard) // 検証済みのユーザーのみアクセス可能 - トークン発行済みのユーザー
  @ApiBearerAuth('access-token') // SwaggerでのJWTトークンキーの設定
  @Post('/create') // localhost:5000/calendar/create
  @ApiOperation({
    summary: 'スケジュールを作成',
    description: 'スケジュールを作成するAPI'
  })
  @ApiCreatedResponse({
    description: '成功かどうか',
    schema: {
      example: { success: true },
    }
  })
  @UsePipes(ValidationPipe) // dtoがバリデーションルールに従っているか検証
  async createCalendar(@Body() dto:CreateCalendarDto): Promise<void> {
    return await this.calendarService.createCalendar(dto);
  }


  /**
   * @author ckcic
   * @description ユーザーのスケジュールを全て取得するメソッド
   *
   * @param dto スケジュール取得DTO
   * @param res データを返すためのパラメーター
   * @returns ユーザーのスケジュールのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/all') // localhost:5000/calendar/all
  @ApiOperation({
    summary: 'ユーザーのスケジュールを全て取得',
    description: 'ユーザーのスケジュールを全て取得するAPI',
  })
  @ApiCreatedResponse({
    description: '成功かどうか',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 1,
            title: "Meeting with clients",
            start: "2023-04-17T09:00:00.000Z",
            end: "2023-04-17T11:00:00.000Z",
            location: "Conference room A",
            description: "Meeting"
          },
        ],
      },
    },
  })
  async findAll(@Body() dto:SearchIdCalendarDto, @Res() res: Response) {
    const data = await this.calendarService.findAllCalendar(dto);
    return res.json(data);
  }


  /**
   * @author ckcic
   * @description ユーザーのスケジュールを月別で取得するメソッド
   *
   * @param dto スケジュール取得DTO
   * @param res データを返すためのパラメーター
   * @returns ユーザーのスケジュールのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/month') // localhost:5000/calendar/month
  @ApiOperation({
    summary: 'ユーザーのスケジュールを月別で取得',
    description: 'ユーザーのスケジュールを月別で取得するAPI',
  })
  @ApiCreatedResponse({
    description: '成功かどうか',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 1,
            title: "Meeting with clients",
            start: "2023-04-17T09:00:00.000Z",
            end: "2023-04-17T11:00:00.000Z",
            location: "Conference room A",
            description: "Meeting"
          },
        ],
      },
    },
  })
  async findMonth(@Body() dto: SearchCalendarDto, @Res() res: Response) {
    const data = await this.calendarService.findMonthCalendar(dto);
    return res.json(data);
  }


  /**
   * @author ckcic
   * @description ユーザーの一週間のスケジュールを取得するメソッド
   *
   * @param dto スケジュール取得DTO
   * @param res データを返すためのパラメーター
   * @returns ユーザーのスケジュールのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/week') // localhost:5000/calendar/week
  @ApiOperation({
    summary: 'ユーザーの一週間のスケジュールを取得',
    description: 'ユーザーの一週間のスケジュールを取得するAPI',
  })
  @ApiCreatedResponse({
    description: '成功かどうか',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 1,
            title: "Meeting with clients",
            start: "2023-04-17T09:00:00.000Z",
            end: "2023-04-17T11:00:00.000Z",
            location: "Conference room A",
            description: "Meeting"
          },
        ],
      },
    },
  })
  @UsePipes(ValidationPipe)
  async findWeek(@Body() dto: SearchCalendarDto, @Res() res: Response) {
    const data = await this.calendarService.findWeekCalendar(dto);
    return res.json(data);
  }


  /**
   * @author ckcic
   * @description ユーザーの一日のスケジュールを取得するメソッド
   *
   * @param dto スケジュール取得DTO
   * @param res データを返すためのパラメーター
   * @returns ユーザーのスケジュールのデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/date') // localhost:5000/calendar/date
  @ApiOperation({
    summary: 'ユーザーの一日のスケジュールを取得',
    description: 'ユーザーの一日のスケジュールを取得するAPI',
  })
  @ApiCreatedResponse({
    description: '成功かどうか',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 1,
            title: "Meeting with clients",
            start: "2023-04-17T09:00:00.000Z",
            end: "2023-04-17T11:00:00.000Z",
            location: "Conference room A",
            description: "Meeting"
          },
        ],
      },
    },
  })
  @UsePipes(ValidationPipe)
  async findDate(@Body() dto: SearchCalendarDto, @Res() res: Response) {
    const data = await this.calendarService.findDateCalendar(dto);
    return res.json(data);
  }

  
  /**
   * @author ckcic
   * @description スケジュールを更新するメソッド
   *
   * @param id スケジュールの固有id
   * @param dto スケジュール更新DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('/update_calendar/:id') // localhost:5000/calendar/update_calendar/1
  @ApiOperation({
    summary: 'スケジュールを更新',
    description: 'スケジュールを更新するAPI'
  })
  @ApiCreatedResponse({
    description: '成功かどうか',
    schema: {
      example: { success: true },
    }
  })
  @UsePipes(ValidationPipe)
  async updateCalendar(
    @Param('id', ParseIntPipe) id: number, // idが整数型なのか検証
    @Body() dto:UpdateCalendarDto
  ) {
    return await this.calendarService.updateCalendar(id, dto);
  }

  
  /**
   * @author ckcic
   * @description スケジュールを削除するメソッド
   *
   * @param id スケジュールの固有id
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete('/delete_calendar/:id') // localhost:5000/calendar/delete_calendar/1
  @ApiOperation({
    summary: 'スケジュールを削除',
    description: 'スケジュールを削除するAPI'
  })
  @ApiCreatedResponse({
    description: '成功かどうか',
    schema: {
      example: { success: true },
    }
  })
  async deleteCalendar(@Param('id') id: number) { // idが整数型なのか検証
    return await this.calendarService.deleteCalendar(id);
  }
}
  