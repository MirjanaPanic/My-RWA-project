import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { RequestWithUser } from './types/RequestWithUser';
import { Public } from './decorators/public.decorator';
import { AuthResponse } from './types/AuthResponse';
import { UserDto } from './dtos/userdto';

//RUTIRANJE I VALIDACIJA
@Public() //javne rute, ne koristi jwt guard
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //zahtev na /auth/login
  @UseGuards(AuthGuard('local')) //prvo to,  req.user  ili  Unauthorized
  @Post('login')
  async login(@Request() req: RequestWithUser): Promise<AuthResponse> {
    return this.authService.login(req.user); //token
  }

  //zahtev na /auth/register
  @Post('register')
  async register(@Body() userDto: UserDto): Promise<AuthResponse> {
    return await this.authService.register(userDto); //token
  }
}
