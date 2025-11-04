import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TimerService } from '../services/timer.service';
import { map, switchMap } from 'rxjs';
import * as TimerActions from './timer.actions';

@Injectable()
export class TimerEffects {
  private actions$ = inject(Actions); //stream svih akcija
  private router = inject(Router);
  private timerService = inject(TimerService);

  matchingTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimerActions.getTagsMatchRequest),
      switchMap(({ input }) =>
        this.timerService.getMatchingTags( input ).pipe(
          map((response) => {
            return TimerActions.tagsMatchingSuccess({ tags: response });
          })
          /*catchError((error) =>
            of(
              AuthActions.loginFailure({
                error:
                  error.status === 401
                    ? 'Unauthorized user'
                    : 'An error occurred. Please try again.',
              })
            )
          )*/
        )
      )
    )
  );
}
