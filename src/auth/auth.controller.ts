import { Controller, Post, Body, Res, UsePipes, ValidationPipe, HttpStatus, HttpCode, UseGuards, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, JwtRefreshAuthGuard } from './guards';
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Tokens } from './types';
import { SignUpDto, SignInDto } from './dto';
import { GetCurrentUser, GetCurrentUserId } from './decorators';

@Controller('auth')
@ApiTags('Auth') // Swaggerタグの設定
export class AuthController {
  constructor(private readonly authService: AuthService){} // 依存性の注入、AuthServiceクラスのインスタンスを注入
  
  /**
   * @author ckcic
   * @description 会員登録するメソッド
   *
   * @param dto 会員登録DTO
   * @returns {Promise<Tokens>} JWTトークンを戻り値として返す
   */
  @Post('/local/signup') // localhost:5000/auth/local/signup
  @ApiOperation({
    summary: '会員登録',
    description: '会員登録するAPI'
  })
  @HttpCode(HttpStatus.CREATED)
  async singupLocal(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.singupLocal(dto);
  }
  

  /**
   * @author ckcic
   * @description ログインするメソッド
   *
   * @param dto ログインDTO
   * @returns {Promise<Tokens>} JWTトークンを戻り値として返す
   */
  @Post('/local/signin') // localhost:5000/auth/local/signin
  @ApiOperation({
    summary: 'ログイン',
    description: 'ログインするAPI'
  })
  @HttpCode(HttpStatus.OK)
  async singinLocal(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.singinLocal(dto);
  }
  

  /**
   * @author ckcic
   * @description ログアウトするメソッド
   *
   * @param userId ユーザーの固有id
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard) // 検証済みのユーザーのみアクセス可能 - トークン発行済みのユーザー
  @ApiBearerAuth('access-token') // SwaggerでのJWTトークンキーの設定
  @Post('/logout') // localhost:5000/auth/logout
  @ApiOperation({
    summary: 'ログアウト',
    description: 'ログアウトするAPI'
  })
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: number): Promise<void>{
    return this.authService.logout(userId);
  }
  

  /**
   * @author ckcic
   * @description JWTトークンを再発行するメソッド
   *
   * @param userId ユーザーの固有id
   * @param refreshToken リフレッシュトークン
   * @returns {Promise<Tokens>} JWTトークンを戻り値として返す
   */
  @UseGuards(JwtRefreshAuthGuard)
  @ApiBearerAuth('refresh-token')
  @Post('/refresh') // localhost:5000/auth/refresh
  @ApiOperation({
    summary: 'JWTトークンを再発行',
    description: 'JWTトークンを再発行するAPI'
  })
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string): Promise<Tokens>{
    return this.authService.refreshTokens(userId, refreshToken); 
  }

}
