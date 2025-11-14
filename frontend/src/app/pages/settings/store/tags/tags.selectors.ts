import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TagState } from '../../models/tag.state';
import { tagsAdapter } from './tags.reducer';

export const selectTagsState = createFeatureSelector<TagState>('tags');

export const { selectAll } = tagsAdapter.getSelectors();
export const selectAllTags = createSelector(selectTagsState, selectAll);

export const selectError = createSelector(selectTagsState, (state: TagState) => state.error);
