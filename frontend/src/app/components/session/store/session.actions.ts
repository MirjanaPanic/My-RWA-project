import { createAction, props } from '@ngrx/store';
import { Tag } from '../../../pages/settings/models/tag.model';
import { Session } from '../models/session.model';

export const newSessionRequest = createAction(
  '[Session] Request for creating new session',
  props<{ focusTime: number; breakTime: number; loops: number; tagId?: number | null }>()
);

export const newSessionSuccess = createAction(
  '[Session] New session successfuly created',
  props<{ session: Session }>()
);


