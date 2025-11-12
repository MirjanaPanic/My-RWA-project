import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SessionService } from '../services/session.service';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import * as SessionActions from './session.actions';
import { selectSessionId } from './session.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class SessionEffects {
  private actions$ = inject(Actions); //stream svih akcija
  private router = inject(Router);
  private sessionService = inject(SessionService);
  private store: Store = inject(Store);

  newSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.newSessionRequest),
      switchMap(({ focusTime, breakTime, loops, tagId }) =>
        this.sessionService.createNewSession(focusTime, breakTime, loops, tagId ?? undefined).pipe(
          map((response) => {
            return SessionActions.newSessionSuccess({ session: response });
          })
        )
      )
    )
  );

  pausedWork$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.pausedWorkRequest),
      withLatestFrom(this.store.select(selectSessionId)), //stream akcija i stream selectId
      switchMap(([action, sessionId]) =>
        this.sessionService.pausedWorkUpdate(sessionId!, action.timeLeft, action.status).pipe(
          map((response) => {
            return SessionActions.updatedSessionSuccess({ session: response });
          })
        )
      )
    )
  );

  pausedBreak$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.pausedBreakRequest),
      withLatestFrom(this.store.select(selectSessionId)), //stream akcija i stream selectId
      switchMap(([action, sessionId]) =>
        this.sessionService.pausedBreakUpdate(sessionId!, action.timeLeft, action.status).pipe(
          map((response) => {
            return SessionActions.updatedSessionSuccess({ session: response });
          })
        )
      )
    )
  );

  continue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.continueRequest),
      withLatestFrom(this.store.select(selectSessionId)), //stream akcija i stream selectId
      switchMap(([action, sessionId]) =>
        this.sessionService.continueSession(sessionId!, action.status).pipe(
          map((response) => {
            return SessionActions.updatedSessionSuccess({ session: response });
          })
        )
      )
    )
  );

  cancel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.cancelSessionRequest),
      withLatestFrom(this.store.select(selectSessionId)), //stream akcija i stream selectId
      switchMap(([action, sessionId]) =>
        this.sessionService.cancelSession(sessionId!, action.status).pipe(
          map((response) => {
            return SessionActions.updatedSessionSuccess({ session: response });
          })
        )
      )
    )
  );

  breakTime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.breakTimeRequest),
      withLatestFrom(this.store.select(selectSessionId)), //stream akcija i stream selectId
      switchMap(([action, sessionId]) =>
        this.sessionService.breakTimeStarted(sessionId!, action.status).pipe(
          map((response) => {
            return SessionActions.updatedSessionSuccess({ session: response });
          })
        )
      )
    )
  );

  nextRound$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.nextRoundRequest),
      withLatestFrom(this.store.select(selectSessionId)), //stream akcija i stream selectId
      switchMap(([action, sessionId]) =>
        this.sessionService.nextRoundRequest(sessionId!, action.status).pipe(
          map((response) => {
            return SessionActions.updatedSessionSuccess({ session: response });
          })
        )
      )
    )
  );

  done$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.doneSessionRequest),
      withLatestFrom(this.store.select(selectSessionId)), //stream akcija i stream selectId
      switchMap(([action, sessionId]) =>
        this.sessionService.doneSession(sessionId!, action.timeLeft, action.status).pipe(
          map((response) => {
            return SessionActions.updatedSessionSuccess({ session: response });
          })
        )
      )
    )
  );

   earlyDone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.earlyDoneSessionRequest),
      withLatestFrom(this.store.select(selectSessionId)), //stream akcija i stream selectId
      switchMap(([action, sessionId]) =>
        this.sessionService.doneSession(sessionId!, action.timeLeft, action.status).pipe(
          map((response) => {
            return SessionActions.updatedSessionSuccess({ session: response });
          })
        )
      )
    )
  );
}
