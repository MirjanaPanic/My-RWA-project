import { createAction, props } from '@ngrx/store';
import { Tag } from '../../models/tag.model';

//akcija koja se salje ka serveru
export const getAllTagsRequest = createAction('[Tags] Request for all tags of user');
export const allTagsSuccess = createAction('[Tags] Tags are received', props<{ tags: Tag[] }>());

export const deleteTagRequest = createAction(
  '[Tags] Request for deleting tag of user',
  props<{ id: number }>()
);
export const deleteTagSuccess = createAction('[Tags] Tag is deleted', props<{ id: number }>());

export const addNewTagRequest = createAction(
  '[Tags] Request for adding new tag of user',
  props<{ name: string }>()
);
export const addNewTagSuccess = createAction(
  '[Tags] Tag is added',
  props<{ id: number; name: string }>()
);
export const addNewTagFailure = createAction(
  '[Tags] Add new tag Failure',
  props<{ error: string }>()
);

export const updateTagRequest = createAction(
  '[Tags] Request for editing tag',
  props<{ id: number; name: string }>()
);

export const updateTagSuccess = createAction(
  '[Tags] Tag is updated',
  props<{ id: number; name: string }>()
);

export const resetServerErrorMessage = createAction(
  "[Settings] Reset Error message after it's read"
);
