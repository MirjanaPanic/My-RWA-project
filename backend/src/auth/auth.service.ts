import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/user.service';
import { UserDto } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AccessTokenPayload } from './types/AccessTokenPayload';
import { AuthResponse } from './types/AuthResponse';

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
      throw new UnauthorizedException('User does not exist'); //401 error
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('User does not exist');
    }
    return user; //sigurno nije null
  }

  async login(user: User): Promise<AuthResponse> {
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
      throw new BadRequestException('username already exists');
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUserDto: UserDto = { ...userDto, password: hashedPassword };
    const newUser: User = await this.usersService.createUser(newUserDto);
    return this.login(newUser); //kad se registruje novi korisnik, automatski ga i logujemo
  }
}
