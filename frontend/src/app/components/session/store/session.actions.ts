import { createAction, props } from '@ngrx/store';
import { Tag } from '../../../pages/settings/models/tag.model';
import { Session } from '../models/session.model';
import { SessionStatus } from '../models/session.status';

export const newSessionRequest = createAction(
  '[Session] Request for creating new session',
  props<{ focusTime: number; breakTime: number; loops: number; tagId?: number | null }>()
);

export const newSessionSuccess = createAction(
  '[Session] New session successfuly created',
  props<{ session: Session }>()
);

export const pausedWorkRequest = createAction(
  '[Session] Pause detected while focus phase',
  props<{ timeLeft: number; status: SessionStatus }>()
);

export const pausedBreakRequest = createAction(
  '[Session] Pause detected while break phase',
  props<{ timeLeft: number; status: SessionStatus }>()
);

export const cancelSessionRequest = createAction(
  '[Session] Request for cancel session',
  props<{ status: SessionStatus }>()
);

export const doneSessionRequest = createAction(
  '[Session] Session is full completed',
  props<{ timeLeft: number; status: SessionStatus }>()
);

export const earlyDoneSessionRequest = createAction(
  '[Session] Session is done earlier, on demand.',
  props<{ timeLeft: number; status: SessionStatus }>()
);

export const continueRequest = createAction(
  '[Session] Continue session',
  props<{ status: SessionStatus }>()
);

export const breakTimeRequest = createAction(
  '[Session] Break time started.',
  props<{ status: SessionStatus }>()
);

export const nextRoundRequest = createAction(
  '[Session] Next round is ready to start',
  props<{ status: SessionStatus }>()
);

export const setStatusInProgres = createAction('[Session] Setting in progress status.');

export const updatedSessionSuccess = createAction(
  '[Session] Latest version of session record in database',
  props<{ session: Session }>()
);
