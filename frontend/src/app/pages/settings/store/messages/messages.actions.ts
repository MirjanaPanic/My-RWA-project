import { createAction, props } from "@ngrx/store";
import { Message } from "../../models/message.model";

export const getAllMessagesRequest = createAction('[Messages] Request for all messages of user');
export const allMessagesSuccess = createAction('[Messages] Messages are received', props<{ messages: Message[] }>());
