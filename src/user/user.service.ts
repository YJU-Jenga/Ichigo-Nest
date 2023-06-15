import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from "./dto";
import { User } from '../model/entity/user.entity';
import { CartService } from 'src/cart/cart.service';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>, // Userリポジトリを注入
    private readonly cartService: CartService // CartServiceクラスのインスタンスを注入
  ) {} // 依存性の注入

  /**
   * @author ckcic
   * @description ユーザー全体を取得するメソッド
   *
   * @returns {User[]} ユーザー全体のデータを戻り値として返す
   */
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }


  /**
   * @author ckcic
   * @description ユーザーのデータ取得するメソッド
   * 
   * @param id ユーザーの固有ID
   * @returns {Promise<User>} ユーザーデータを戻り値として返す
   */
  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({id});
  }


  /**
   * @author ckcic
   * @description ログインしたユーザーのデータ取得するメソッド
   *
   * @param email ユーザーのメール
   * @returns  ユーザーデータでpassword,refreshTokenを除いてを戻り値として返す
   */
  async findUser(email: string) {
    const user = await this.usersRepository.findOneBy({email});
    const {password,refreshToken, ...result} = user;
    return result;
  }


  /**
   * @author ckcic
   * @description ユーザーのデータを修正するメソッド
   *
   * @param id ユーザーの固有ID
   * @param updateUserDto ユーザー情報更新DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this. usersRepository.update( id, updateUserDto );
  }


  /**
   * @author ckcic
   * @description ユーザーのでーたを削除するメソッド
   *
   * @param id ユーザーの固有ID
   * @returns {Promise<void>}
   */
  async deleteUser(id: number): Promise<void> {
    await this.cartService.deleteCart(id);  // ユーザーのカートも削除する
    await this.usersRepository.delete(id);
  }  
}
