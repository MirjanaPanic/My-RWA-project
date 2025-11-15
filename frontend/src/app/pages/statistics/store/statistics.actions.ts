import { createAction, props } from '@ngrx/store';
import { Tag } from '../../settings/models/tag.model';

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
