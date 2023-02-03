import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { User } from '../model/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async craeteUser(createUserDto: CreateUserDto): Promise<void> {
    const { user_id, password, name, age } = createUserDto;

    await this.usersRepository.save({
      user_id,
      password,
      salt: 'salt',
      name,
      age
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({id});
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this. usersRepository.update( id, updateUserDto );
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  
}
