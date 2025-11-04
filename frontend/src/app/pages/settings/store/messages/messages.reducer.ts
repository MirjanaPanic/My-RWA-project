import { createReducer, on } from '@ngrx/store';
import { MessageState } from '../../models/message.state';
import * as MessagesActions from './messages.actions';

export const initialState: MessageState = {
  messages: [],
  error: null,
};

export const messagesReducer = createReducer(
  initialState,
  on(MessagesActions.allMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages: messages,
  })),
  on(MessagesActions.updateMessageSuccess, (state, { id, text }) => ({
    ...state,
    messages: state.messages.map((msg) => (msg.id === id ? { ...msg, text: text } : msg)),
  })),
  on(MessagesActions.deleteMessageSuccess, (state, { id }) => ({
    ...state,
    messages: state.messages.filter((msg) => msg.id !== id),
  })),
  on(MessagesActions.addNewMessageSuccess, (state, { id, text }) => ({
    ...state,
    messages: [...state.messages, { id, text }],
  })),
  on(MessagesActions.addNewMessageFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(MessagesActions.resetServerErrorMessage, (state) => ({ ...state, error: null }))
);
