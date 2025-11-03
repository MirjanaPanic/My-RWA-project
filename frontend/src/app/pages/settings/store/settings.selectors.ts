import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TagState } from '../models/tag.state';

export const selectSettingsState = createFeatureSelector<TagState>('settings');

export const selectAllTags = createSelector(selectSettingsState, (state: TagState) => state.tags); //id, username
export const selectError = createSelector(selectSettingsState, (state: TagState) => state.error);
