import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { SessionStatus } from './models/session.status';
import { CreateSessionDto } from './dtos/createsession.dto';
import { SessionDto } from './dtos/session.dto';
import { UpdateSessionDto } from './dtos/updateSession.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private sessionsRepo: Repository<Session>,
  ) {}

  async createSession(
    createSessionDto: CreateSessionDto,
    userId: number,
  ): Promise<SessionDto> {
    const newSessionData: DeepPartial<Session> = {
      //deo entiteta
      user: { id: userId },
      roundTime: createSessionDto.focusTime,
      repetitions: createSessionDto.loops,
      breakTime: createSessionDto.breakTime,
      sessionStatus: SessionStatus.IN_PROGRESS,
      currentRound: 1,
      timeLeft: createSessionDto.focusTime * 60,
      startTime: new Date(),
    };

    if (createSessionDto.tagId !== undefined) {
      newSessionData.tag = { id: createSessionDto.tagId };
    }

    const newSession = this.sessionsRepo.create(newSessionData);
    const savedSession = await this.sessionsRepo.save(newSession);

    return {
      id: savedSession.id,
      roundTime: savedSession.roundTime,
      repetitions: savedSession.repetitions,
      breakTime: savedSession.breakTime,
      sessionStatus: savedSession.sessionStatus,
      currentRound: savedSession.currentRound,
      timeLeft: savedSession.timeLeft,
      startTime: savedSession.startTime,
      tagId: savedSession.tag?.id,
    };
  }

  async updateSession(
    sessionId: number,
    updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    const session = await this.sessionsRepo.findOne({
      where: { id: sessionId },
    });
    if (!session) throw new NotFoundException('Session not found');

    session.sessionStatus = updateSessionDto.status;
    session.timeLeft = updateSessionDto.timeLeft;

    return this.sessionsRepo.save(session);
  }

  async continue(sessionId: number, status: SessionStatus): Promise<Session> {
    const session = await this.sessionsRepo.findOne({
      where: { id: sessionId },
    });
    if (!session) throw new NotFoundException('Session not found');

    session.sessionStatus = status;

    return this.sessionsRepo.save(session);
  }
}
