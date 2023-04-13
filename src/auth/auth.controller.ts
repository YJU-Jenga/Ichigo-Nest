import { Controller, Post, Body, Res, UsePipes, ValidationPipe, HttpStatus, HttpCode, UseGuards, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, JwtRefreshAuthGuard } from './guards';
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Tokens } from './types';
import { SignUpDto, SignInDto } from './dto';
import { GetCurrentUser, GetCurrentUserId } from './decorators';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}
  
  @Post('/local/signup')
  @ApiOperation({
    summary: '회원가입',
    description: '회원가입 API'
  })
  @HttpCode(HttpStatus.CREATED)
  async singupLocal(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.singupLocal(dto);
  }
  
  @Post('/local/signin')
  @ApiOperation({
    summary: '로그인',
    description: '로그인 API'
  })
  @HttpCode(HttpStatus.OK)
  async singinLocal(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.singinLocal(dto);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/logout')
  @ApiOperation({
    summary: '로그아웃',
    description: '로그아웃 API'
  })
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: number){
    return this.authService.logout(userId);
  }
  
  @UseGuards(JwtRefreshAuthGuard)
  @ApiBearerAuth('refresh-token')
  @Post('/refresh')
  @ApiOperation({
    summary: '토큰 재발급',
    description: '토큰 재발급 API'
  })
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string){
    return this.authService.refreshTokens(userId, refreshToken); 
  }

}
