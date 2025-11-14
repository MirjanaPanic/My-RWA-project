import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StatisticsState } from '../models/statistics.state';

export const selectStatisticsState = createFeatureSelector<StatisticsState>('statistics');

export const selectDailyAvgFocus = createSelector(
  selectStatisticsState,
  (state: StatisticsState) => state.dailyAvgFocus
);

export const selectAllTags = createSelector(
  selectStatisticsState,
  (state: StatisticsState) => state.tags
);
