import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from "./dto";
import { User } from '../model/entity/user.entity';
import { CartService } from 'src/cart/cart.service';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly cartService: CartService
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({id});
  }

  async findUser(email: string) {
    const user = await this.usersRepository.findOneBy({email});
    const {password,refreshToken, ...result} = user;
    return result;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this. usersRepository.update( id, updateUserDto );
  }

  async deleteUser(id: number): Promise<void> {
    await this.cartService.deleteCart(id);
    await this.usersRepository.delete(id);
  }

  
}
