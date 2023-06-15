import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment, Post } from 'src/model/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post])], // エンティティをインポート
  controllers: [CommentController], // コントローラはクライアントへのリクエストとレスポンスを担当
  providers: [CommentService], // プロバイダーにサービスを登録、サービスはビジネスロジックを担当
})
export class CommentModule {}
