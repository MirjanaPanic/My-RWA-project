import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { SessionStatus } from './models/session.status';
import { CreateSessionDto } from './dtos/createsession.dto';
import { SessionDto } from './dtos/session.dto';
import { UpdateSessionDto } from './dtos/updateSession.dto';
import { User } from '../users/entities/user.entity';
import { Tag } from '../tags/entities/tag.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private sessionsRepo: Repository<Session>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Tag) private tagsRepo: Repository<Tag>,
  ) {}

  async createSession(
    createSessionDto: CreateSessionDto,
    userId: number,
  ): Promise<SessionDto> {
    let tag: Tag | undefined = undefined;
    if (createSessionDto.tagId) {
      const t = await this.tagsRepo.findOne({
        where: { id: createSessionDto.tagId },
      });
      tag = t ?? undefined;
    }

    const newSession = this.sessionsRepo.create({
      user: { id: userId },
      tag,
      roundTime: createSessionDto.focusTime * 60,
      repetitions: createSessionDto.loops,
      breakTime: createSessionDto.breakTime * 60,
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

  async canceled(sessionId: number, status: SessionStatus): Promise<Session> {
    //mozda da se brise zapis o sesiji, razmotriti
    const session = await this.sessionsRepo.findOne({
      where: { id: sessionId },
    });
    if (!session) throw new NotFoundException('Session not found');

    session.sessionStatus = status;

    return this.sessionsRepo.save(session);
  }

  async breakTimeStarted(
    sessionId: number,
    status: SessionStatus,
  ): Promise<Session> {
    const session = await this.sessionsRepo.findOne({
      where: { id: sessionId },
    });
    if (!session) throw new NotFoundException('Session not found');

    session.sessionStatus = status;
    session.timeLeft = session.breakTime;

    return this.sessionsRepo.save(session);
  }

  async nextRound(sessionId: number, status: SessionStatus): Promise<Session> {
    const session = await this.sessionsRepo.findOne({
      where: { id: sessionId },
    });
    if (!session) throw new NotFoundException('Session not found');

    session.sessionStatus = status;
    session.currentRound = session.currentRound + 1;
    session.timeLeft = session.roundTime;

    return this.sessionsRepo.save(session);
  }

  async dailyFocus(id: number): Promise<number> {
    const userStats = await this.usersRepo.findOne({
      where: { id: id },
    });
    if (!userStats) return -1;

    const sessions: Session[] = await this.sessionsRepo.find({
      where: { user: { id } },
    });
    //grupacija po danu
    const grouped = sessions.reduce(
      (acc, session) => {
        const day = session.startTime.toISOString().split('T')[0]; // "2025-01-18"

        const focusTime =
          (session.currentRound - 1) * session.roundTime +
          (session.roundTime - session.timeLeft);
        //DODATI PROVERU DA SAMO UZIMA DONE AND EARLY DONE SESSIONS
        //key je day
        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push(focusTime);

        return acc;
      },
      {} as Record<string, number[]>,
    );

    const averages = Object.values(grouped).map((times) => {
      const sum = times.reduce((a, b) => a + b, 0); //za jedan dan suma
      return sum / times.length; //prosecno za danS
    });

    const avgMinutes =
      averages.reduce((a, b) => a + b, 0) / averages.length / 60;
    return Math.round(avgMinutes * 100) / 100;
  }

  async getAllTagsOfUser(id: number): Promise<Tag[]> {
    const sessions: Session[] = await this.sessionsRepo.find({
      where: { user: { id } },
      relations: ['tag'],
    });

    //uzmi im tagove, ne samo id, pribavi na osnovu id ceo tag
    const allTags: Tag[] = sessions
      .map((s) => s.tag)
      .filter((t): t is Tag => !!t);

    const distinctTagsMap = new Map<number, Tag>(); //key -tagid, value-tag
    allTags.forEach((tag) => {
      if (!distinctTagsMap.has(tag.id)) {
        distinctTagsMap.set(tag.id, tag); //samo ako nije vec u mapi
      }
    });
    return Array.from(distinctTagsMap.values());
  }
}
