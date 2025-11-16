import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StatisticsState } from '../models/statistics.state';

export const selectStatisticsState = createFeatureSelector<StatisticsState>('statistics');

export const selectDailyAvgFocus = createSelector(
  selectStatisticsState,
  (state: StatisticsState) => state.dailyAvgFocus
);

export const selectSelectedTags = createSelector(
  selectStatisticsState,
  (state: StatisticsState) => state.selectedTags
);
export const selectWeekStart = createSelector(
  selectStatisticsState,
  (state: StatisticsState) => state.weekStart
);

export const selectChartData = createSelector(
  selectStatisticsState,
  (state: StatisticsState) => state.chartData
);
