import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/core/auth/guards/jwt.guard';
import { SessionsService } from './session.service';
import { CurrentUser } from 'src/core/auth/decorators/currentUser.decorator';
import { CreateSessionDto } from './dtos/createsession.dto';

@UseGuards(JwtGuard) //
@Controller('session')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  //kreiranje nove sesije
  /* focusTime: this.focusTime,
        breakTime: this.breakTime,
        loops: this.loops,
        tag: this.selectedTag,*/
  @Post('new')
  create(
    @Body() createSessionDto: CreateSessionDto,
    @CurrentUser() userId: number,
  ) {
    console.log(createSessionDto);
    return this.sessionsService.createSession(createSessionDto, userId);
  }
}
