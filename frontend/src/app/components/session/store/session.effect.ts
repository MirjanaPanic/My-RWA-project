import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SessionService } from '../services/session.service';
import { map, switchMap, tap } from 'rxjs';
import * as SessionActions from './session.actions';

@Injectable()
export class SessionEffects {
  private actions$ = inject(Actions); //stream svih akcija
  private router = inject(Router);
  private sessionService = inject(SessionService);

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
}
