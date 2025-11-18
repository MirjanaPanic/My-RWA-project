import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

import { Strategy } from 'passport-local';

import { JwtUser } from '../types/JwtUser';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<JwtUser> {
    const user: JwtUser = await this.authService.validateUser(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return user; //guard dodaje usera u req.user
  }
}
