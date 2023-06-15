import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from 'src/model/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Music])], // エンティティをインポート
  controllers: [MusicController], // コントローラはクライアントへのリクエストとレスポンスを担当
  providers: [MusicService], // プロバイダーにサービスを登録、サービスはビジネスロジックを担当
})
export class MusicModule {}
