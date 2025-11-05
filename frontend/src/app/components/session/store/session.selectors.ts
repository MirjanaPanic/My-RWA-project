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
