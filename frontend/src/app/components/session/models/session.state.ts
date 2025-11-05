import { SessionStatus } from "./session.status";

export interface SessionState {
  tagId: number;
  roundTime: number;
  repetitions: number;
  breakTime: number;
  startTime: Date;
  sessionStatus: SessionStatus;
  currentRound: number;
  timeLeft: number;
}
