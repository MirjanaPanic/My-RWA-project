import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/core/auth/guards/jwt.guard';
import { SessionsService } from './session.service';
import { CurrentUser } from 'src/core/auth/decorators/currentUser.decorator';
import { CreateSessionDto } from './dtos/createsession.dto';
import { UpdateSessionDto } from './dtos/updateSession.dto';
import { Session } from './entities/session.entity';
import { SessionStatus } from './models/session.status';

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

  @Patch('pausedWork/:id')
  updateSession(
    @Param('id') id: number,
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    return this.sessionsService.updateSession(id, updateSessionDto);
  }

  @Patch('continue/:id')
  continueSession(
    @Param('id') id: number,
    @Body('status') status: SessionStatus,
  ): Promise<Session> {
    return this.sessionsService.continue(id, status);
  }
}
