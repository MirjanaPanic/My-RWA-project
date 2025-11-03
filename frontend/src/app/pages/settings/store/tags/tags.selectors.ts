import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TagState } from '../../models/tag.state';

export const selectTagsState = createFeatureSelector<TagState>('tags');

export const selectAllTags = createSelector(selectTagsState, (state: TagState) => state.tags); //id, username
export const selectError = createSelector(selectTagsState, (state: TagState) => state.error);
