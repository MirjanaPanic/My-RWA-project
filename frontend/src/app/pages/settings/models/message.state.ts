import { Message } from './message.model';

export interface MessageState {
  messages: Message[];
  error: string | null;
}
