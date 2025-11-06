import { createReducer, on } from '@ngrx/store';
import { SessionState } from '../models/session.state';
import { SessionStatus } from '../models/session.status';
import * as SessionActions from './session.actions';

export const initialState: SessionState = {
  tagId: 0,
  roundTime: 0,
  repetitions: 0,
  breakTime: 0,
  startTime: null,
  sessionStatus: null,
  currentRound: 0,
  timeLeft: 0,
};

export const sessionReducer = createReducer(
  initialState,
  on(SessionActions.newSessionSuccess, (state, { session }) => ({
    ...state,
    ...session,
  }))
);
