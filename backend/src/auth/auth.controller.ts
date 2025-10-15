import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { RegisterResponseDTO } from './dtos/register-response.dto';
import type { RequestWithUser } from './types/RequestWithUser';
import { AccessToken } from './types/AccessToken';
import { UserDto } from 'src/users/dto/user.dto';
import { Public } from './decorators/public.decorator';

//RUTIRANJE I VALIDACIJA
@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //zahtev na /auth/login
  @UseGuards(AuthGuard('local')) //prvo to,  req.user  ili  Unauthorized
  @Post('login')
  async login(@Request() req: RequestWithUser): Promise<AccessToken> {
    return this.authService.login(req.user); //token
  }

  //zahtev na /auth/register
  @Post('register')
  async register(@Body() registerBody: UserDto): Promise<RegisterResponseDTO> {
    return await this.authService.register(registerBody); //token
  }
}
