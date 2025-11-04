import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TimerState } from '../models/timer.state';

export const selectTimerState = createFeatureSelector<TimerState>('timer');

export const selectMatchingTags = createSelector(
  selectTimerState,
  (state: TimerState) => state.matchingTags
);
