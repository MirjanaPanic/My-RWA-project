import { Message } from './message.model';
import { EntityState } from '@ngrx/entity';

export interface MessageState extends EntityState<Message> {
  error: string | null;
}
