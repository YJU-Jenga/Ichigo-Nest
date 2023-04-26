import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe, UseGuards, Request, Res, HttpStatus, Req} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto, SearchCalendarDto, SearchIdCalendarDto, UpdateCalendarDto } from "./dto";
import { Calendar } from 'src/model/entity';
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('calendar')
@ApiTags('Calendar')  // Swagger Tag 설정
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  // ----------- 생성 -----------
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/create')
  @ApiOperation({
    summary: '스케줄 생성',
    description: '스케줄 생성 API'
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { success: true },
    }
  })
  async createCalendar(@Body() dto:CreateCalendarDto) {
    return await this.calendarService.createCalendar(dto);
  }


  // ----------- 조회 -----------
  @UseGuards(JwtAuthGuard)  // 검증된 유저만 접근 가능 - 토큰 발행 된 유저
  @ApiBearerAuth('access-token') //JWT 토큰 키 설정
  @Post('/all')
  @ApiOperation({
    summary: '스케줄 전체 조회',
    description: '스케줄 전체 조회 API',
  })
  @ApiCreatedResponse({
    description: '성공여부',
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
  async findAll(@Body() dto:SearchIdCalendarDto): Promise<Calendar[]> {
    return await this.calendarService.findAllCalendar(dto);
  }

  @UseGuards(JwtAuthGuard)  // 검증된 유저만 접근 가능 - 토큰 발행 된 유저
  @ApiBearerAuth('access-token') //JWT 토큰 키 설정
  @Post('/month')
  @ApiOperation({
    summary: '스케줄 월간 조회',
    description: '스케줄 월간 조회 API',
  })
  @ApiCreatedResponse({
    description: '성공여부',
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
  async findMonth(@Body() dto: SearchCalendarDto): Promise<Calendar[]> {
    return await this.calendarService.findMonthCalendar(dto);
  }

  @UseGuards(JwtAuthGuard)  // 검증된 유저만 접근 가능 - 토큰 발행 된 유저
  @ApiBearerAuth('access-token') //JWT 토큰 키 설정
  @Post('/week')
  @ApiOperation({
    summary: '스케줄 주간 조회',
    description: '스케줄 주간 조회 API',
  })
  @ApiCreatedResponse({
    description: '성공여부',
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
  async findWeek(@Body() dto: SearchCalendarDto): Promise<Calendar[]> {
    return await this.calendarService.findWeekCalendar(dto);
  }

  @UseGuards(JwtAuthGuard)  // 검증된 유저만 접근 가능 - 토큰 발행 된 유저
  @ApiBearerAuth('access-token') //JWT 토큰 키 설정
  @Post('/date')
  @ApiOperation({
    summary: '스케줄 일간 조회',
    description: '스케줄 일간 조회 API',
  })
  @ApiCreatedResponse({
    description: '성공여부',
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
  async findDate(@Body() dto: SearchCalendarDto): Promise<Calendar[]> {
    return await this.calendarService.findDateCalendar(dto);
  }

  // ----------- 수정 -----------
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('/update_calendar/:id')
  @ApiOperation({
    summary: '스케줄 수정',
    description: '스케줄 수정 API'
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { success: true },
    }
  })
  @UsePipes(ValidationPipe)
  async updateCalendar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto:UpdateCalendarDto
  ) {
    return await this.calendarService.updateCalendar(id, dto);
  }

  // ----------- 삭제 -----------
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete('/delete_calendar/:id')
  @ApiOperation({
    summary: '스케줄 삭제',
    description: '스케줄 삭제 API'
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { success: true },
    }
  })
  async deleteCalendar(@Param('id') id: number) {
    return await this.calendarService.deleteCalendar(id);
  }
}
  