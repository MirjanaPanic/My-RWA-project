import { createAction, props } from '@ngrx/store';

export const dailyAvgFocusRequest = createAction(
  '[Statistics] Request for average daily focus time for user'
);

export const dailyAvgFocusSuccess = createAction(
  '[Statistics] Average daily focus time for user',
  props<{ dailyAvgFocus: number }>()
);
