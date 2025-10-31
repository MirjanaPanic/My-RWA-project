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

  //kad koristim AuthGuard("local") poziva se ova metoda, automatski
  //iz body-ja request-a uzima podatke
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
