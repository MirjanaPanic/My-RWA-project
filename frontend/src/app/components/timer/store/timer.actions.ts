import { createAction, props } from '@ngrx/store';
import { Tag } from '../../../pages/settings/models/tag.model';

export const getTagsMatchRequest = createAction(
  '[Timer] Request for all tags that matching search input',
  props<{ input: string }>()
);
export const tagsMatchingSuccess = createAction(
  '[Timer] Tags that match search',
  props<{ tags: Tag[] }>()
);
