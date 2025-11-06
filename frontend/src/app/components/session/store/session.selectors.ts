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

export const selectIsSessionActive = createSelector(
  selectSessionState,
  (session) => session.sessionStatus === 0 //0 = IN_PROGRESS
  //true or false
);

export const selectCurrentRound=createSelector(selectSessionState, (session)=>session.currentRound)

export const selectTimeLeft=createSelector(selectSessionState, (session)=>session.timeLeft)
