import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SessionState } from '../models/session.state';

export const selectSessionState = createFeatureSelector<SessionState>('session');

export const selectSessionConfiguration = createSelector(
  selectSessionState,
  (state: SessionState) => ({
    roundTime: state.roundTime,
    breakTime: state.breakTime,
    repetitions: state.repetitions,
  })
);

//ako je startovana sesija, da se mountuje tajmer 
export const selectHasSession = createSelector(
  selectSessionState,
  (session) => session.sessionStatus != null
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

export const selectSessionId = createSelector(selectSessionState, (session) => session.id);
