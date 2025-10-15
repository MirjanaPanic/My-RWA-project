import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import type { RequestWithUser } from 'src/auth/types/RequestWithUser';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Req() req: RequestWithUser) {
    // req.user postavlja JwtStrategy na osnovu tokena
    return req.user;
  }
}
