import { createReducer, on } from '@ngrx/store';
import { StatisticsState } from '../models/statistics.state';
import * as StatisticsActions from './statistics.actions';

export const initialState: StatisticsState = {
  dailyAvgFocus: null,
 
  weekStart: '',
  selectedTags: [],
};

export const statisticsReducer = createReducer(
  initialState,
  on(StatisticsActions.dailyAvgFocusSuccess, (state, { dailyAvgFocus }) => ({
    ...state,
    dailyAvgFocus,
  })),
  on(StatisticsActions.updateSelectedTagsRequest, (state, { selectedTags }) => ({
    ...state,
    selectedTags,
  })),
  on(StatisticsActions.updateWeekStartRequest, (state, { weekStart }) => ({
    ...state,
    weekStart,
  }))
);
