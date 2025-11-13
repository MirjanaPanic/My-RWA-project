import { createReducer, on } from '@ngrx/store';
import { StatisticsState } from '../models/statistics.state';
import * as StatisticsActions from './statistics.actions';

export const initialState: StatisticsState = {
  dailyAvgFocus: null,
};

export const statisticsReducer = createReducer(
  initialState,
  on(StatisticsActions.dailyAvgFocusSuccess, (state, { dailyAvgFocus }) => ({
    ...state,
    dailyAvgFocus,
  }))
);
