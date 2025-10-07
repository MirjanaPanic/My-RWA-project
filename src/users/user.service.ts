import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  //userRepo je tabela u bazi :)
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(userDto: UserDto): Promise<User> {
    const user = this.userRepo.create(userDto);
    return this.userRepo.save(user);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOneBy({ username });
  }
}
