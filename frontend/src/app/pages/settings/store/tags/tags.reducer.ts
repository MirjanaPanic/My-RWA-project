import { createReducer, on } from '@ngrx/store';
import { TagState } from '../../models/tag.state';
import * as TagsActions from './tags.actions';

//lista objekata koji imaju id i name
export const initialState: TagState = {
  tags: [], //ili null?   ....Tag[]
  error: null,
};

export const tagsReducer = createReducer(
  initialState,
  on(TagsActions.allTagsSuccess, (state, { tags }) => ({
    ...state,
    tags: tags,
  })),
  on(TagsActions.deleteTagSuccess, (state, { id }) => ({
    ...state,
    tags: state.tags.filter((tag) => tag.id !== id),
  })),
  on(TagsActions.addNewTagSuccess, (state, { id, name }) => ({
    ...state,
    tags: [...state.tags, { id, name }],
  })),
  on(TagsActions.addNewTagFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TagsActions.updateTagSuccess, (state, { id, name }) => ({
    ...state,
    tags: state.tags.map((tag) => (tag.id === id ? { ...tag, name: name } : tag)),
  })),
  on(TagsActions.resetServerErrorMessage, (state) => ({ ...state, error: null }))
);
