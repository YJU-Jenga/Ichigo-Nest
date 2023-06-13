import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './configs/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from "./middleware/auth.middleware";
import { UserController } from "./user/user.controller";
import { BoardModule } from './board/board.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { PurchaseOrderModule } from './purchase_order/purchase_order.module';
import { CommentModule } from './comment/comment.module';
import { ProductModule } from './product/product.module';
import { CalendarModule } from './calendar/calendar.module';
import { DeviceModule } from './device/device.module';
import { AlarmModule } from './alarm/alarm.module';
import { MusicModule } from './music/music.module';
import { ModelsModule } from './models/models.module';
import { ClothesModule } from './clothes/clothes.module';
import * as Joi from 'joi';



@Module({ // モジュールを定義
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig), // TypeORMの設定を使用してデータベースの接続を確立するためのモジュールをインポート
    ConfigModule.forRoot({ // 環境変数の設定
      isGlobal: true,
      envFilePath: process.env.NODE_ENV  === 'dev' ? '.env.dev' : '.env.local', // .env.devまたは.env.localファイルから環境変数を読み込みます。
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'local').required(),
        ACCESS_SECRET_KEY: Joi.string().required(),
        ACCESS_EXPIRES_IN: Joi.string().required(),
        REFRESH_SECRET_KEY: Joi.string().required(),
        REFRESH_EXPIRES_IN: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true
        // trueに設定すると、バリデーションエラーが発生するとすぐにバリデーションプロセスが停止し、エラーメッセージが返される。
        // 最初のエラーが検出された時点でバリデーションが終了する。
        // falseに設定すると、バリデーションエラーが発生しても全てのバリデーションルールをチェックし、複数のエラーメッセージを収集する。
        // その後、すべてのエラーメッセージが返される。
      }
    }),
    // 他のアプリケーションモジュールをインポート
    UserModule,
    BoardModule,
    PostModule,
    AuthModule,
    CartModule,
    PurchaseOrderModule,
    CommentModule,
    ProductModule,
    CalendarModule,
    DeviceModule,
    AlarmModule,
    MusicModule,
    ModelsModule,
    ClothesModule,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        // Middleware設定
        .apply(AuthMiddleware)
        // exclude 関数は除外したいルータを登録
        .exclude({ path: 'user/create_user', method: RequestMethod.POST }) // ユーザー登録
        .exclude({ path: 'user/user_all', method: RequestMethod.GET }) // ユーザー全体検索
        .forRoutes(UserController); // 1.ユーザーコントローラー登録
        // .forRoutes('user'); // 2.ユーザーコントローラーのパス登録 => 1.と同じ効果
  }
}