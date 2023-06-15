import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendar } from '../model/entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateCalendarDto, SearchCalendarDto, SearchIdCalendarDto, UpdateCalendarDto } from './dto';


@Injectable()
export class CalendarService {
  constructor(@InjectRepository(Calendar) private readonly calendarRepository: Repository<Calendar>) {} // 依存性の注入、Calendarリポジトリを注入

  /**
   * @author ckcic
   * @description スケジュールを作成するメソッド
   *
   * @param dto スケジュール作成DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async createCalendar (dto:CreateCalendarDto): Promise<void> {
    try {
      const {userId, title, start, end, location, description, utcOffset} = dto;
      console.log(utcOffset);
      const adjustedStart = new Date(new Date(start).getTime() + (parseInt(utcOffset) * 60000)).toISOString();
      const adjustedEnd = new Date(new Date(end).getTime() + (parseInt(utcOffset) * 60000)).toISOString();
      console.log("saveStart", adjustedStart);
      console.log("saveEnd", adjustedEnd);
      await this.calendarRepository.save({
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


  /**
   * @author ckcic
   * @description ユーザーの一日のスケジュールを取得するメソッド
   *
   * @param dto スケジュール取得DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<Calendar[]>} ユーザーのスケジュールのデータを戻り値として返す
   */
  async findDateCalendar (dto:SearchCalendarDto): Promise<Calendar[]> {
    try {
      const {userId, dateString} = dto;
      const date = new Date(dateString);
      const serverUtcTime = new Date(); // サーバーのUTC時間
      const serverUtcOffset = serverUtcTime.getTimezoneOffset() * -1; // サーバーのUTC offset
      const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0 + (serverUtcOffset / 60), 0, 0);
      const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0 + (serverUtcOffset / 60), 0, 0);
      return await this.calendarRepository.find({
        where:[
          {
            // その日だけスケジュールがある場合
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


  /**
   * @author ckcic
   * @description ユーザーの一週間のスケジュールを取得するメソッド
   *
   * @param dto スケジュール取得DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<Calendar[]>} ユーザーのスケジュールのデータを戻り値として返す
   */
  async findWeekCalendar (dto:SearchCalendarDto): Promise<Calendar[]> {
    try {
      const {userId, dateString} = dto;
      const date = new Date(dateString);
      const serverUtcTime = new Date(); // サーバーのUTC時間
      const serverUtcOffset = serverUtcTime.getTimezoneOffset() * -1; // サーバーのUTC offset
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


  /**
   * @author ckcic
   * @description ユーザーのスケジュールを月別で取得するメソッド
   *
   * @param dto スケジュール取得DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<Calendar[]>} ユーザーのスケジュールのデータを戻り値として返す
   */
  async findMonthCalendar (dto:SearchCalendarDto): Promise<Calendar[]> {
    try {
      const {userId, dateString} = dto;
      const date = new Date(dateString);
      const serverUtcTime = new Date(); // サーバーのUTC時間
      const serverUtcOffset = serverUtcTime.getTimezoneOffset() * -1; // サーバーのUTC offset
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


  /**
   * @author ckcic
   * @description ユーザーのスケジュールを全て取得するメソッド
   *
   * @param dto スケジュール取得DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<Calendar[]>} ユーザーのスケジュールのデータを戻り値として返す
   */
  async findAllCalendar (dto:SearchIdCalendarDto): Promise<Calendar[]> {
    try {
      const {userId} = dto;
      return await this.calendarRepository.findBy({userId});
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description スケジュールを更新するメソッド
   *
   * @param calendarId スケジュールの固有id
   * @param dto スケジュール更新DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async updateCalendar (calendarId:number, dto:UpdateCalendarDto): Promise<void> {
    try {
      const {title, start, end, location, description, utcOffset} = dto;
      console.log(utcOffset);
      const adjustedStart = new Date(new Date(start).getTime() + (parseInt(utcOffset) * 60000)).toISOString();
      const adjustedEnd = new Date(new Date(end).getTime() + (parseInt(utcOffset) * 60000)).toISOString();
      console.log("updateStart", adjustedStart);
      console.log("updateEnd", adjustedEnd);
      await this.calendarRepository.update(calendarId, {
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


  /**
   * @author ckcic
   * @description スケジュールを削除するメソッド
   *
   * @param calendarId スケジュールの固有id
   * @returns {Promise<void>}
   */
  async deleteCalendar (calendarId:number): Promise<void> {
    try {
      await this.calendarRepository.delete(calendarId);
    } catch (error) {
      console.log(error);
    }
  }
}
