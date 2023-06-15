import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/model/entity/user.entity';
import { SignUpDto, SignInDto } from './dto';
import { Tokens } from './types';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, // JwtServiceクラスのインスタンスを注入
    private readonly configService: ConfigService, // ConfigServiceクラスのインスタンスを注入
    private readonly cartService: CartService, // CartServiceクラスのインスタンスを注入
    @InjectRepository(User) private readonly usersRepository: Repository<User>, // Userリポジトリを注入
    ) {} // 依存性の注入

  /**
   * @author ckcic
   * @description 会員登録するメソッド
   *
   * @param dto 会員登録DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<Tokens>} JWTトークンを戻り値として返す
   */
  async singupLocal(dto: SignUpDto): Promise<Tokens> {
    try {
      const { name, email, password, phone } = dto;
      const newUser = await this.usersRepository.save({
        name,
        email,
        password: await this.hashData(password),
        phone
      });

      await this.cartService.createCart(newUser.id);

      const tokens = await this.getTokens(newUser.id, newUser.email);
      await this.updateRefreshToken(newUser.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw new HttpException({
        message: "すでに登録済みのメールです。",
        error: error.sqlMessage,
      },
      HttpStatus.FORBIDDEN);
    }
  }


  /**
   * @author ckcic
   * @description ログインするメソッド
   *
   * @param dto ログインDTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<Tokens>} JWTトークンを戻り値として返す
   */
  async singinLocal(dto: SignInDto): Promise<Tokens> {
    try {
      const { email, password } = dto;
      const user = await this.usersRepository.findOne({where: {email}});
      if (!user) throw new ForbiddenException("IDとパスワードを正しく記入してください。");

      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) throw new ForbiddenException("IDとパスワードを正しく記入してください。");

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw new HttpException({
        message: "IDとパスワードを正しく記入してください。",
        error: error.sqlMessage,
      },
      HttpStatus.FORBIDDEN);
    }
  }


  /**
   * @author ckcic
   * @description ログアウトするメソッド
   *
   * @param id ユーザーの固有id
   * @returns {Promise<void>}
   */
  async logout(id: number): Promise<void> {
    try {
      const user = await this.usersRepository.findOne({where: {id},});
      if (!user) throw new ForbiddenException("Access-Denied");
      await this.usersRepository.update(id, {refreshToken: null});
    } catch (error) {
      throw new HttpException({
        message: "認証されていないアクセス",
        error: error,
      },
      HttpStatus.FORBIDDEN);
    }
  }


  /**
   * @author ckcic
   * @description JWTトークンを再発行するメソッド
   *
   * @param id ユーザーの固有id
   * @param refreshToken リフレッシュトークン
   * @returns {Promise<Tokens>} JWTトークンを戻り値として返す
   */
  async refreshTokens(id: number, refreshToken: string): Promise<Tokens> {
    try {
      if(refreshToken == undefined) throw new ForbiddenException("Access-Denied");
      
      const user = await this.usersRepository.findOne({where: {id}});
      if (!user) throw new ForbiddenException("Access-Denied");
      if(user.refreshToken == null) throw new ForbiddenException("Access-Denied");
      
      const refreshTokenMathres = bcrypt.compare(refreshToken, user.refreshToken);
      if (!refreshTokenMathres) throw new ForbiddenException("Access-Denied");
  
      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw new HttpException({
        message: "인증되지 않은 접근",
        error: error,
      },
      HttpStatus.FORBIDDEN);
    }
  }


  /**
   * @author ckcic
   * @description 渡されたデータをハッシュ化するメソッド
   *
   * @param data 渡されたデータ
   * @returns {Promise<string>} ハッシュ化した結果を戻り値として返す
   */
  async hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }


  /**
   * @author ckcic
   * @description ユーザーのリフレッシュトークンを更新するメソッド
   *
   * @param id ユーザーの固有id
   * @param refreshToken リフレッシュトークン
   * @returns {Promise<void>}
   */
  async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
    await this.usersRepository.update(id, { refreshToken: await this.hashData(refreshToken)});
  }


  /**
   * @author ckcic
   * @description JWTトークン生成するメソッド
   *
   * @param id ユーザーの固有id
   * @param email ユーザーのメール
   * @returns {Promise<Tokens>} JWTトークンを戻り値として返す
   */
  async getTokens(id: number, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          email
        },
        {
          secret: this.configService.get<string>('ACCESS_SECRET_KEY'),
          expiresIn: `${this.configService.get<string>('ACCESS_EXPIRES_IN')}m`,
        }
      ),
      this.jwtService.signAsync(
        {
          sub: id, 
          email
        },
        {
          secret: this.configService.get<string>('REFRESH_SECRET_KEY'),
          expiresIn: `${this.configService.get<string>('REFRESH_EXPIRES_IN')}d`,
        }
      ),
    ]);

    return { 
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

}
