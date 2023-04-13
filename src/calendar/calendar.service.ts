import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendar } from '../model/entity';
import { Between, Repository } from 'typeorm';
import { CreateCalendarDto, UpdateCalendarDto } from './dto';


@Injectable()
export class CalendarService {
  constructor(@InjectRepository(Calendar) private readonly calendarRepository: Repository<Calendar>) {}

  //crud
  async createCalendar (dto:CreateCalendarDto) {
    try {
      const {userId, title, start, end, location, description} = dto;
      return await this.calendarRepository.save({
        userId,
        title,
        start,
        end,
        location,
        description
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findDateCalendar (userId:number, date:Date): Promise<Calendar[]> {
    try {
      const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
      const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0);
      return await this.calendarRepository.find({
        where: {
          userId,
          start: Between(startDate,endDate)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  async findWeekCalendar (userId:number, date:Date): Promise<Calendar[]> {
    try {
      const weekStart = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay(), 0, 0, 0);
      const weekEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7, 23, 59, 59);

      return await this.calendarRepository.find({
        where: {
          userId,
          start: Between(weekStart,weekEnd)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  async findMonthCalendar (userId:number, date:Date): Promise<Calendar[]> {
    try {
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

      return await this.calendarRepository.find({
        where: {
          userId,
          start: Between(monthStart, monthEnd)
        }
      });
    } catch (error) {
      console.log(error);
    }
}

  async findAllCalendar (userId:number): Promise<Calendar[]> {
    try {
      return await this.calendarRepository.findBy({userId});
    } catch (error) {
      console.log(error);
    }
}

  async updateCalendar (calendarId:number, dto:UpdateCalendarDto) {
    try {
      const {userId, title, start, end, location, description} = dto
      return await this.calendarRepository.update(calendarId, {
        userId,
        title,
        start,
        end,
        location,
        description
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