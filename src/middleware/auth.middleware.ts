import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  /**
   * @author ckcic
   * @description ミドルウェアの設定の練習をしました。ビジネスロジックの部分に検定のロジックを追加して利用
   * 
   * @param req ユーザーからリクエスト情報を受け取る際に使用
   * @param res ユーザーにレスポンスする時に使用
   * @param next 次のルーターに行く時に使用
   * 
   */
  use(req: Request, res: Response, next: NextFunction) {
    // ビジネスロジック

    next();
  }
}