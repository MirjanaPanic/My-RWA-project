import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MessageState } from "../../models/message.state";

export const selectMessagesState = createFeatureSelector<MessageState>('messages');

export const selectAllMessages = createSelector(selectMessagesState, (state: MessageState) => state.messages); //id, username
export const selectError = createSelector(selectMessagesState, (state: MessageState) => state.error);
