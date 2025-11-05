import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { SessionStatus } from './models/session.status';
import { CreateSessionDto } from './dtos/createsession.dto';
import { SessionDto } from './dtos/session.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private sessionsRepo: Repository<Session>,
  ) {}

  async createSession(
    createSessionDto: CreateSessionDto,
    userId: number,
  ): Promise<SessionDto> {
    const newSession: Session = this.sessionsRepo.create({
      tag: { id: createSessionDto.tagId },
      user: { id: userId },
      roundTime: createSessionDto.focusTime,
      repetitions: createSessionDto.loops,
      breakTime: createSessionDto.breakTime,
      sessionStatus: SessionStatus.IN_PROGRESS,
      currentRound: 1,
      timeLeft: createSessionDto.focusTime * 60,
      startTime: new Date(),
    });
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
}
