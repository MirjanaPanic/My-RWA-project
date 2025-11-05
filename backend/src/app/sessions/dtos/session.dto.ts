import { SessionStatus } from '../models/session.status';

export class SessionDto {
  id: number;

  roundTime: number; // trajanje runde u minutima

  repetitions: number; // broj rundi

  breakTime: number; // pauza u minutima

  tagId?: number; // opcioni strani ključ za tag

  sessionStatus: SessionStatus; // default može biti IN_PROGRESS

  currentRound: number; // default 1

  timeLeft: number; // u sekundama, može se postaviti na roundTime*60

  startTime: Date; // default = new Date()
}
