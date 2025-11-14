import { createReducer, on } from '@ngrx/store';
import { TagState } from '../../models/tag.state';
import * as TagsActions from './tags.actions';
import { createEntityAdapter } from '@ngrx/entity';
import { Tag } from '../../models/tag.model';

export const tagsAdapter = createEntityAdapter<Tag>({
  selectId: (tag) => tag.id,
  sortComparer: false,
});
export const initialState: TagState = tagsAdapter.getInitialState({
  error: null,
});

export const tagsReducer = createReducer(
  initialState,
  on(TagsActions.allTagsSuccess, (state, { tags }) => tagsAdapter.setAll(tags, state)),
  on(TagsActions.deleteTagSuccess, (state, { id }) => tagsAdapter.removeOne(id, state)),
  on(TagsActions.addNewTagSuccess, (state, { id, name }) =>
    tagsAdapter.addOne({ id, name }, state)
  ),
  on(TagsActions.addNewTagFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TagsActions.updateTagSuccess, (state, { id, name }) =>
    tagsAdapter.updateOne(
      {
        id: id,
        changes: { name },
      },
      state
    )
  ),
  on(TagsActions.resetServerErrorMessage, (state) => ({ ...state, error: null }))
);
