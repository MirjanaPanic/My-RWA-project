import {
  Body,
  Controller,
  Get,
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

  @Post('new')
  create(
    @Body() createSessionDto: CreateSessionDto,
    @CurrentUser() userId: number,
  ) {
    console.log(createSessionDto);
    return this.sessionsService.createSession(createSessionDto, userId);
  }

  @Patch('pause/:id')
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

  @Patch('cancel/:id')
  cancelSession(
    @Param('id') id: number,
    @Body('status') status: SessionStatus,
  ): Promise<Session> {
    return this.sessionsService.canceled(id, status);
  }

  @Patch('breaktime/:id')
  breakTimeStarted(
    @Param('id') id: number,
    @Body('status') status: SessionStatus,
  ): Promise<Session> {
    return this.sessionsService.breakTimeStarted(id, status);
  }

  @Patch('nextRound/:id')
  nextRoundRequest(
    @Param('id') id: number,
    @Body('status') status: SessionStatus,
  ): Promise<Session> {
    return this.sessionsService.nextRound(id, status);
  }

  @Patch('done/:id')
  doneSession(
    @Param('id') id: number,
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    return this.sessionsService.updateSession(id, updateSessionDto);
  }

  @Get('dailyAvgFocus')
  dailyAverageFocus(@CurrentUser() id: number) {
    return this.sessionsService.dailyFocus(id);
  }
}
