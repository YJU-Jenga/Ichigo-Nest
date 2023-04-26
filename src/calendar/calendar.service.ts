import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendar } from '../model/entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateCalendarDto, SearchCalendarDto, SearchIdCalendarDto, UpdateCalendarDto } from './dto';


@Injectable()
export class CalendarService {
  constructor(@InjectRepository(Calendar) private readonly calendarRepository: Repository<Calendar>) {}

  //crud
  async createCalendar (dto:CreateCalendarDto) {
    try {
      const {userId, title, start, end, location, description, utcOffset} = dto;
      console.log(utcOffset);
      const adjustedStart = new Date(new Date(start).getTime() + (parseInt(utcOffset) * 60000)).toISOString();
      const adjustedEnd = new Date(new Date(end).getTime() + (parseInt(utcOffset) * 60000)).toISOString();
      console.log("saveStart", adjustedStart);
      console.log("saveEnd", adjustedEnd);
      return await this.calendarRepository.save({
        userId,
        title,
        start: adjustedStart,
        end: adjustedEnd,
        location,
        description
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findDateCalendar (dto:SearchCalendarDto): Promise<Calendar[]> {
    try {
      const {userId, dateString} = dto;
      const date = new Date(dateString);
      const serverUtcTime = new Date(); // 서버의 UTC 시간
      const serverUtcOffset = serverUtcTime.getTimezoneOffset() * -1; // 서버의 UTC offset
      const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0 + (serverUtcOffset / 60), 0, 0);
      const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0 + (serverUtcOffset / 60), 0, 0);
      return await this.calendarRepository.find({
        where:[
          {
            // 해당 날짜에만 일정이 있을 경우
            userId,
            start: MoreThanOrEqual(startDate), 
            end: LessThanOrEqual(endDate)
          }, 
          {
            userId,
            start: LessThanOrEqual(startDate), 
            end: MoreThanOrEqual(endDate)
          }, 
          {
            userId,
            start: Between(startDate, endDate)
          },
          {
            userId,
            end: Between(startDate, endDate)
          }
        ]
      })
    } catch (error) {
      console.log(error);
    }
  }

  async findWeekCalendar (dto:SearchCalendarDto): Promise<Calendar[]> {
    try {
      const {userId, dateString} = dto;
      const date = new Date(dateString);
      const serverUtcTime = new Date(); // 서버의 UTC 시간
      const serverUtcOffset = serverUtcTime.getTimezoneOffset() * -1; // 서버의 UTC offset
      const weekStart = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay(), 0 + (serverUtcOffset / 60), 0, 0);
      const weekEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7, 0 + (serverUtcOffset / 60) -1, 59, 59);
      return await this.calendarRepository.find({
        where: [
          {
            userId,
            start: Between(weekStart, weekEnd)
          },
          {
            userId,
            end: Between(weekStart, weekEnd)
          }
        ]
      })
    } catch (error) {
      console.log(error);
    }
  }

  async findMonthCalendar (dto:SearchCalendarDto): Promise<Calendar[]> {
    try {
      const {userId, dateString} = dto;
      const date = new Date(dateString);
      const serverUtcTime = new Date(); // 서버의 UTC 시간
      const serverUtcOffset = serverUtcTime.getTimezoneOffset() * -1; // 서버의 UTC offset
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1, 0 + (serverUtcOffset / 60), 0, 0);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 0 + (serverUtcOffset / 60) - 1, 59, 59);
      return await this.calendarRepository.find({
        where: [
          {
            userId,
            start: Between(monthStart, monthEnd)
          },
          {
            userId,
            end: Between(monthStart, monthEnd)
          }
        ]
      });
    } catch (error) {
      console.log(error);
    }
}

  async findAllCalendar (dto:SearchIdCalendarDto): Promise<Calendar[]> {
    try {
      const {userId} = dto;
      return await this.calendarRepository.findBy({userId});
    } catch (error) {
      console.log(error);
    }
}

  async updateCalendar (calendarId:number, dto:UpdateCalendarDto) {
    try {
      const {title, start, end, location, description, utcOffset} = dto;
      console.log(utcOffset);
      const adjustedStart = new Date(new Date(start).getTime() + (parseInt(utcOffset) * 60000)).toISOString();
      const adjustedEnd = new Date(new Date(end).getTime() + (parseInt(utcOffset) * 60000)).toISOString();
      console.log("updateStart", adjustedStart);
      console.log("updateEnd", adjustedEnd);
      return await this.calendarRepository.update(calendarId, {
       title,
       start: adjustedStart,
       end: adjustedEnd,
       location,
       description,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCalendar (calendarId:number) {
    try {
      return await this.calendarRepository.delete(calendarId);
    } catch (error) {
      console.log(error);
    }
  }
}
