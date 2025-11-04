import { createReducer, on } from '@ngrx/store';
import { TimerState } from '../models/timer.state';
import * as TimerActions from './timer.actions';

export const initialState: TimerState = {
  matchingTags: [],
};

export const timerReducer = createReducer(
  initialState,
  on(TimerActions.tagsMatchingSuccess, (state, { tags }) => ({
    ...state,
    matchingTags: tags,
  }))
);
