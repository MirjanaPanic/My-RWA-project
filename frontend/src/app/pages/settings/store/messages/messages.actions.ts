import { createAction, props } from '@ngrx/store';
import { Message } from '../../models/message.model';

export const getAllMessagesRequest = createAction('[Messages] Request for all messages of user');
export const allMessagesSuccess = createAction(
  '[Messages] Messages are received',
  props<{ messages: Message[] }>()
);

export const updateMessageRequest = createAction(
  '[Messages] Request for update message',
  props<{ id: number; text: string }>()
);
export const updateMessageSuccess = createAction(
  '[Messages] Success update message',
  props<{ id: number; text: string }>()
);

export const deleteMessageRequest = createAction(
  '[Messages] Request for deleting message',
  props<{ id: number }>()
);
export const deleteMessageSuccess = createAction(
  '[Messages] Success delete message',
  props<{ id: number }>()
);

export const addNewMessageRequest = createAction(
  '[Messages] Request for adding new message',
  props<{ text: string }>()
);
export const addNewMessageSuccess = createAction(
  '[Messages] Success add message',
  props<{ id: number; text: string }>()
);
export const addNewMessageFailure = createAction(
  '[Messages] Failure adding new message',
  props<{ error: string }>()
);

export const resetServerErrorMessage = createAction(
  "[Settings] Reset Error message after it's read"
);
