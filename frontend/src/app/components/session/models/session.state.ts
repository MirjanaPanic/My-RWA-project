import { SessionStatus } from './session.status';

export interface SessionState {
  tagId: number;
  roundTime: number;
  repetitions: number;
  breakTime: number;
  startTime: Date | null;
  sessionStatus: SessionStatus | null;
  currentRound: number;
  timeLeft: number;
}
