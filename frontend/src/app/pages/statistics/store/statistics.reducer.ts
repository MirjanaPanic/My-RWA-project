import { createReducer, on } from '@ngrx/store';
import { StatisticsState } from '../models/statistics.state';
import * as StatisticsActions from './statistics.actions';

export const initialState: StatisticsState = {
  dailyAvgFocus: null,
  tags: [],
};

export const statisticsReducer = createReducer(
  initialState,
  on(StatisticsActions.dailyAvgFocusSuccess, (state, { dailyAvgFocus }) => ({
    ...state,
    dailyAvgFocus,
  })),
  on(StatisticsActions.allTagsOfUserSuccess, (state, { tags }) => ({
    ...state,
    tags,
  }))
);
