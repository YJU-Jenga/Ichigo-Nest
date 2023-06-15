import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

type JwtPayload = {
  sub: string,
  email: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      // RequestでJWTトークンを抽出する方法を設定 -> AuthorizationでBearer TokenにJWTトークンを入れて送信する必要がある
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //trueに設定するとPassportにトークン検証を委任せずに直接検証、falseはPassportに検証を委任します。
      ignoreExpiration: false,
      // 検証秘密値(流出注意)
      secretOrKey: process.env.ACCESS_SECRET_KEY,
    });
  }

  /**
   * @author ckcic
   * @description JWTの有効性を検証するためのメソッド
   *
   * @param payload 転送されたトークンの内容
   * @returns {Promise<JwtPayload>} トークンの内容を戻り値として返す
   */
  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return payload;
  }
}