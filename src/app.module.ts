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
import { OrderModule } from './order/order.module';
import { CommentModule } from './comment/comment.module';
import { ProductModule } from './product/product.module';
import { FileModule } from './file/file.module';
import * as Joi from 'joi';



@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV  === 'dev' ? '.env.dev' : '.env.local',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'local').required(),
        ACCESS_SECRET_KEY: Joi.string().required(),
        ACCESS_EXPIRES_IN: Joi.string().required(),
        REFRESH_SECRET_KEY: Joi.string().required(),
        REFRESH_EXPIRES_IN: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true
      }
    }),
    UserModule,
    BoardModule,
    PostModule,
    AuthModule,
    CartModule,
    OrderModule,
    CommentModule,
    ProductModule,
    FileModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        //exclude 함수는 제외 하고싶은 라우터를 등록합니다.
        .exclude({ path: 'user/create_user', method: RequestMethod.POST }) // 유저 생성
        .exclude({ path: 'user/user_all', method: RequestMethod.GET }) // 유저 전체 조회
        .forRoutes(UserController); // 1.유저 컨트롤러 등록
        // .forRoutes('user'); // 2.유저 컨트롤러 경로 등록 -> 위 1번과 동일
  }
}
