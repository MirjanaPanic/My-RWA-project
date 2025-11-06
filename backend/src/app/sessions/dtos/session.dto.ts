import { SessionStatus } from '../models/session.status';

export class SessionDto {
  id: number;
  roundTime: number;

  repetitions: number;

  breakTime: number;

  tagId?: number;

  sessionStatus: SessionStatus;

  currentRound: number;

  timeLeft: number;

  startTime: Date;
}
