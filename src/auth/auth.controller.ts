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
  @HttpCode(HttpStatus.CREATED)
  async singupLocal(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.singupLocal(dto);
  }
  
  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  async singinLocal(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.singinLocal(dto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: number){
    return this.authService.logout(userId);
  }
  
  @UseGuards(JwtRefreshAuthGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string){
    return this.authService.refreshTokens(userId, refreshToken); 
  }

}
