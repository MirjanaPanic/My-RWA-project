import { createReducer, on } from "@ngrx/store";
import { MessageState } from "../../models/message.state";
import * as MessagesActions from "./messages.actions"

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
 
);
