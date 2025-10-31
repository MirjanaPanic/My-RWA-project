import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { AccessTokenPayload } from './types/AccessTokenPayload';
import { AuthResponse } from './types/AuthResponse';
import { UsersService } from 'src/app/users/user.service';
import { User } from 'src/app/users/entities/user.entity';
import { UserDto } from 'src/app/users/dtos/user.dto';
import { JwtUser } from './types/JwtUser';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<JwtUser> {
    const user: User | null =
      await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException('User does not exist'); //401 error
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('User does not exist');
    }
    return { id: user.id, username: user.username }; //sigurno nije null
  }

  async login(user: JwtUser): Promise<AuthResponse> {
    const payload: AccessTokenPayload = {
      userId: user.id,
      username: user.username,
    }; //deo podataka koji ce biti ugradjen u token
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      user: {
        id: user.id,
        username: user.username,
      },
    }; //kreira JWT token
  }

  async register(userDto: UserDto): Promise<AuthResponse> {
    const existingUser = await this.usersService.findOneByUsername(
      userDto.username,
    );
    if (existingUser) {
      throw new BadRequestException('Username already exists'); //status 400
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUserDto: UserDto = { ...userDto, password: hashedPassword };
    const newUser: JwtUser = await this.usersService.createUser(newUserDto);

    return this.login(newUser); //kad se registruje novi korisnik, automatski ga i logujemo
  }
}
