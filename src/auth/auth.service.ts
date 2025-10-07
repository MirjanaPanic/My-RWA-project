import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/user.service';
import { AccessToken } from './types/AccessToken';
import { UserDto } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user: User | null =
      await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(user: User): Promise<AccessToken> {
    const payload = { username: user.username, id: user.id }; //deo podataka koji ce biti ugradjen u token
    return { access_token: await this.jwtService.signAsync(payload) }; //kreira JWT token
  }

  async register(user: UserDto): Promise<AccessToken> {
    const existingUser = await this.usersService.findOneByUsername(
      user.username,
    );
    if (existingUser) {
      throw new BadRequestException('username already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUserDto: UserDto = { ...user, password: hashedPassword };
    const newUser: User = await this.usersService.createUser(newUserDto);
    return this.login(newUser);
  }
}
