import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageState } from '../../models/message.state';
import { messageAdapter } from './messages.reducer';

export const selectMessagesState = createFeatureSelector<MessageState>('messages');

export const { selectAll } = messageAdapter.getSelectors();
export const selectAllMessages = createSelector(selectMessagesState, selectAll);

export const selectError = createSelector(
  selectMessagesState,
  (state: MessageState) => state.error
);
