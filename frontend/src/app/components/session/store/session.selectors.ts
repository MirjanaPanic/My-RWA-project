import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SessionState } from '../models/session.state';
import { SessionStatus } from '../models/session.status';

export const selectSessionState = createFeatureSelector<SessionState>('session');

//verovatno je bolje sessionId
//ako je startovana sesija, da se mountuje tajmer
export const selectHasSession = createSelector(
  selectSessionState,
  (session) =>
    session.sessionStatus !== null &&
    session.sessionStatus !== SessionStatus.CANCEL &&
    session.sessionStatus !== SessionStatus.DONE &&
    session.sessionStatus !== SessionStatus.EARLY_DONE
);

export const selectSessionConfiguration = createSelector(
  selectSessionState,
  (state: SessionState) => ({
    roundTime: state.roundTime,
    breakTime: state.breakTime,
    repetitions: state.repetitions,
  })
);

export const selectCurrentRound = createSelector(
  selectSessionState,
  (session) => session.currentRound
);

export const selectTimeLeft = createSelector(selectSessionState, (session) => session.timeLeft);

export const selectSessionStatus = createSelector(
  selectSessionState,
  (state) => state.sessionStatus
);

export const selectBreaktimeStatus = createSelector(
  selectSessionState,
  (state) => state.sessionStatus === SessionStatus.BREAK
);

export const selectNextRound = createSelector(selectSessionState, (state) => ({
  currentRound: state.currentRound,
  timeLeft: state.timeLeft,
}));

export const selectSessionId = createSelector(selectSessionState, (session) => session.id);
