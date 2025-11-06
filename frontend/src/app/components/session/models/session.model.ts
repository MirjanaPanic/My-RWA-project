
import { SessionStatus } from './session.status';

export interface Session {
  id: number;
  tag: number;
  roundTime: number;
  repetitions: number;
  breakTime: number;
  startTime: Date;
  sessionStatus: SessionStatus;
  currentRound: number;
  timeLeft: number;
}
