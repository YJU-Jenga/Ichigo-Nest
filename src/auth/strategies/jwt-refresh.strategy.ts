import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy,'jwt-refresh') {
  constructor() {
    super({
      // RequestでJWTトークンを抽出する方法を設定 -> AuthorizationでBearer TokenにJWTトークンを入れて送信する必要がある
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //trueに設定するとPassportにトークン検証を委任せずに直接検証、falseはPassportに検証を委任します。
      ignoreExpiration: false,
      /// 検証秘密値(流出注意)
      secretOrKey: process.env.REFRESH_SECRET_KEY,
      passReqToCallback: true,
    });
  }

  /**
   * @author ckcic
   * @description JWTの有効性を検証するためのメソッド
   *
   * @param req リクエストオブジェクト－クライアントからのHTTPリクエストに関する情報を含むオブジェクト
   * @param payload 転送されたトークンの内容
   * @returns トークンの内容とリフレッシュトークンを戻り値として返す
   */
  async validate(req: Request, payload: any) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}