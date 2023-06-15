import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calendar } from 'src/model/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calendar])], // エンティティをインポート
  controllers: [CalendarController], // コントローラはクライアントへのリクエストとレスポンスを担当
  providers: [CalendarService], // プロバイダーにサービスを登録、サービスはビジネスロジックを担当
})
export class CalendarModule {}
