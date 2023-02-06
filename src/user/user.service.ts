import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { User } from '../model/entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async craeteUser(createUserDto: CreateUserDto): Promise<void> {
    try {
      const { name, user_id, password, phone } = createUserDto;
      const saltOrRounds = 10;
  
      await this.usersRepository.save({
        name,
        user_id,
        password : await bcrypt.hash(password, saltOrRounds),
        phone
      });
    } catch (error) {
      throw new HttpException({
        message: "SQL에러",
        error: error.sqlMessage,
      },
      HttpStatus.FORBIDDEN);
      
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({id});
  }

  async findUser(user_id: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({user_id: user_id});
  }

  async findByLogin(user_id: string, password: string): Promise<User> {
      try {
        const user = await this.usersRepository.findOneBy({user_id});
        if(!user) {
          throw new HttpException("아이디와 비밀번호를 다시 확인해주세요.", HttpStatus.FORBIDDEN);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
          throw new HttpException("아이디와 비밀번호를 다시 확인해주세요.", HttpStatus.FORBIDDEN);
        }
        return user;
      } catch (error) {
        throw new HttpException({
          message: error.message,
          error: error.message,
        },
        HttpStatus.FORBIDDEN);
      }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this. usersRepository.update( id, updateUserDto );
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  
}
