import { createAction, props } from '@ngrx/store';
import { Tag } from '../../settings/models/tag.model';
import { ChartData } from 'chart.js';
import { ChartStatsData } from '../models/chart-data.model';

export const dailyAvgFocusRequest = createAction(
  '[Statistics] Request for average daily focus time for user'
);
export const dailyAvgFocusSuccess = createAction(
  '[Statistics] Average daily focus time for user',
  props<{ dailyAvgFocus: number }>()
);

export const updateSelectedTagsRequest = createAction(
  '[Statistics] Update selected tags',
  props<{ selectedTags: Tag[] }>()
);

export const updateWeekStartRequest = createAction(
  '[Statistics] Update week start',
  props<{ weekStart: string }>()
);

export const chartDataRequest = createAction(
  "[Statistics] Request for chart's data",
  props<{ weekStart: string; selectedTagIds: string }>()
);

export const chartDataSuccess = createAction(
  '[Statistics] Retrieved data for chart',
  props<{ data: ChartStatsData[] }>()
);
