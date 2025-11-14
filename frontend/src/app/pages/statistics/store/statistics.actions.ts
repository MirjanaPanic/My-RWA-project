import { createAction, props } from '@ngrx/store';
import { Tag } from '../../settings/models/tag.model';

export const dailyAvgFocusRequest = createAction(
  '[Statistics] Request for average daily focus time for user'
);
export const dailyAvgFocusSuccess = createAction(
  '[Statistics] Average daily focus time for user',
  props<{ dailyAvgFocus: number }>()
);

export const allTagsOfUserRequest = createAction('[Statistics] Request for all tags of user.');
export const allTagsOfUserSuccess = createAction(
  '[Statistics] All tags of user.',
  props<{ tags: Tag[] }>()
);
