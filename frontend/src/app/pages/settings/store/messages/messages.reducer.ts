import { createReducer, on } from '@ngrx/store';
import { MessageState } from '../../models/message.state';
import * as MessagesActions from './messages.actions';
import { createEntityAdapter } from '@ngrx/entity';
import { Message } from '../../models/message.model';

export const messageAdapter = createEntityAdapter<Message>({
  selectId: (msg) => msg.id,
  sortComparer: false,
});
export const initialState: MessageState = messageAdapter.getInitialState({
  error: null,
});

export const messagesReducer = createReducer(
  initialState,
  on(MessagesActions.allMessagesSuccess, (state, { messages }) =>
    messageAdapter.setAll(messages, state)
  ),
  on(MessagesActions.updateMessageSuccess, (state, { id, text }) =>
    messageAdapter.updateOne(
      {
        id: id,
        changes: { text },
      },
      state
    )
  ),
  on(MessagesActions.deleteMessageSuccess, (state, { id }) => messageAdapter.removeOne(id, state)),
  on(MessagesActions.addNewMessageSuccess, (state, { id, text }) =>
    messageAdapter.addOne({ id, text }, state)
  ),
  on(MessagesActions.addNewMessageFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(MessagesActions.resetServerErrorMessage, (state) => ({ ...state, error: null }))
);
