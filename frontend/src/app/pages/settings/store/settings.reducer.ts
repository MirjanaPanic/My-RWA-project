import { createReducer, on } from '@ngrx/store';
import { TagState } from '../models/tag.state';
import * as SettingsActions from './settings.actions';

//lista objekata koji imaju id i name
export const initialState: TagState = {
  tags: [], //ili null?   ....Tag[]
  error: null,
};

export const settingsReducer = createReducer(
  initialState,
  on(SettingsActions.allTagsSuccess, (state, { tags }) => ({
    ...state,
    tags: tags,
  })),
  on(SettingsActions.deleteTagSuccess, (state, { id }) => ({
    ...state,
    tags: state.tags.filter((tag) => tag.id !== id),
  })),
  on(SettingsActions.addNewTagSuccess, (state, { id, name }) => ({
    ...state,
    tags: [...state.tags, { id, name }],
  })),
  on(SettingsActions.addNewTagFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SettingsActions.updateTagSuccess, (state, { id, name }) => ({
    ...state,
    tags: state.tags.map((tag) => (tag.id === id ? { ...tag, name: name } : tag)),
  })),
  on(SettingsActions.resetServerErrorMessage, (state) => ({ ...state, error: null }))
);
