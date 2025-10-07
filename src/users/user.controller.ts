import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }
}
