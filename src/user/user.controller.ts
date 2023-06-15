import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Query, UsePipes, ValidationPipe, UseGuards, Res} from '@nestjs/common';
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update_user.dto";
import { User } from '../model/entity/user.entity';
import { Response } from 'express';
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, JwtRefreshAuthGuard } from 'src/auth/guards';

@Controller('user')
@ApiTags('User')  // Swaggerタグの設定
export class UserController {
  constructor(private readonly userService: UserService) {} // 依存性の注入、UserServiceクラスのインスタンスを注入
  
  /**
   * @author ckcic
   * @description ユーザー全体を取得するメソッド
   *
   * @param res データを返すためのパラメーター
   * @returns ユーザー全体のデータをJSON形式で戻り値として返す
   */
  @UseGuards(JwtAuthGuard)  // 検証済みのユーザーのみアクセス可能 - トークン発行済みのユーザー
  @ApiBearerAuth('access-token') // SwaggerでのJWTトークンキーの設定
  @Get('/user_all') // localhost:5000/user/user_all
  @ApiOperation({
    summary: 'ユーザー全体を取得',
    description: 'ユーザー全体を取得するAPI',
  })
  @ApiCreatedResponse({
    description: '成功かどうか',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 1,
            name: "client",
            user_id: "client@gmail.com",
            email_verified_at: null,
            phone: "010-1234-5678",
            permission: false,
            remember_token: false,
            createdAt: "2023-02-06T06:11:25.748Z",
            updatedAt: "2023-02-06T06:11:25.748Z",
        },
        ],
      },
    },
  })
  async getUserAll(@Res() res: Response) {
    const data = await this.userService.findAll();
    return res.json(data);
  }


  /**
   * @author ckcic
   * @description @Query 方式 - ユーザーのデータを取得するメソッド
   * 
   * @param id ユーザーの固有ID
   * @returns {Promise<User>} ユーザーデータを戻り値として返す
   */ 
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '@Query 方式 - ユーザーのデータを取得',
    description: '@Query 方式 - ユーザーのデータを取得するAPI',
  })
  @Get('/user') // localhost:5000/user/user?id=1
  findByUserOne1(@Query('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }
  
  
  /** 
   * @author ckcic
   * @description @Param 方式 - ユーザーのデータ取得するメソッド
   * 
   * @param id ユーザーの固有ID
   * @returns {Promise<User>} ユーザーデータを戻り値として返す
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '@Param 方式 - ユーザーのデータを取得',
    description: '@Param 方式 - ユーザーのデータを取得するAPI',
  })
  @Get('/user/:id') // localhost:5000/user/user/1
  findByUserOne2(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }


  /**
   * @author ckcic
   * @description @Param 方式 - ログインしたユーザーのデータ取得するメソッド
   * 
   * @param email ユーザーのメール
   * @returns  ユーザーデータでpassword,refreshTokenを除いてを戻り値として返す
   */ 
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'ログインしたユーザーのデータ取得',
    description: 'ログインしたユーザーのデータ取得するAPI',
  })
  @ApiCreatedResponse({
    description: 'ログインしたユーザーのデータ取得',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 1,
            name: "client",
            user_id: "client@gmail.com",
            email_verified_at: null,
            phone: "010-1234-5678",
            permission: false,
            createdAt: "2023-02-06T06:11:25.748Z",
            updatedAt: "2023-02-06T06:11:25.748Z",
        },
        ],
      },
    },
  })
  @Get('/:email') // localhost:5000/user/client@gmail.com
  findUser(@Param('email') email: string){
    return this.userService.findUser(email);
  }


  /** 
   * @author ckcic
   * @description @Param & @Body 混合方式 - ユーザーのデータを修正するメソッド
   * 
   * @param id ユーザーの固有ID
   * @param updateUserDto ユーザー情報更新DTO
   * @returns {Promise<void>}
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'ユーザーのデータを修正',
    description: 'ユーザーのデータを修正するAPI',
  })
  @Patch('/user/:id') // localhost:5000/user/user/1
  @UsePipes(ValidationPipe) // updateUserDtoがバリデーションルールに従っているか検証
  setUser(
    @Param('id', ParseIntPipe) id: number, // idが整数型なのか検証
    @Body() updateUserDto : UpdateUserDto,
  ): Promise<void> {
    return this.userService.updateUser(id, updateUserDto);
  }

  /** 
   * @author ckcic
   * @description @Query 方式 - ユーザーのでーたを削除するメソッド
   * 
   * @param id ユーザーの固有ID
   * @returns {Promise<void>}
   */
  @UseGuards(JwtRefreshAuthGuard)
  @ApiBearerAuth('refresh-token')
  @ApiOperation({
    summary: '@Query 方式 - ユーザーのでーたを削除',
    description: '@Query 方式 - ユーザーのでーたを削除するAPI',
  })
  @Delete('/delete_user') // localhost:5000/user/delete_user?id=1
  deleteUser(@Query('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
