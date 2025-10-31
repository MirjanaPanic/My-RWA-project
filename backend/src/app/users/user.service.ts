import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { JwtUser } from 'src/core/auth/types/JwtUser';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(userDto: UserDto): Promise<JwtUser> {
    const user: JwtUser = this.userRepo.create({
      username: userDto.username,
      password: userDto.password,
    });
    return this.userRepo.save(user); //JwtUser
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOneBy({ username });
  }
}
