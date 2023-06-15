import { Module } from '@nestjs/common';
import { AlarmController } from './alarm.controller';
import { AlarmService } from './alarm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alarm } from 'src/model/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alarm])], // エンティティをインポート
  controllers: [AlarmController], // コントローラはクライアントへのリクエストとレスポンスを担当
  providers: [AlarmService] // プロバイダーにサービスを登録、サービスはビジネスロジックを担当
})
export class AlarmModule {}
