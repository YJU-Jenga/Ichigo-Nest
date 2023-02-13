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
      const { name, email, password, phone } = createUserDto;
      const saltOrRounds = 10;
  
      await this.usersRepository.save({
        name,
        email,
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

  async findUser(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({email});
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this. usersRepository.update( id, updateUserDto );
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  
}
