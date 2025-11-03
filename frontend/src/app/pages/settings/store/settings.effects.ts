import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import * as SettingsActions from './settings.actions';

@Injectable()
export class SettingsEffects {
  private actions$ = inject(Actions); //stream svih akcija
  private router = inject(Router);
  private settingsService = inject(SettingsService);

  allTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.getAllTagsRequest),
      switchMap(() =>
        this.settingsService.getAllTags().pipe(
          map((response) => {
            return SettingsActions.allTagsSuccess({ tags: response });
          }) //access token i user id, username
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

  deleteTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.deleteTagRequest),
      switchMap(({ id }) =>
        this.settingsService.deleteTag(id).pipe(
          map((response) => {
            //status 200 ako je uspesno
            return SettingsActions.deleteTagSuccess({ id: id });
          }) //access token i user id, username
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

  addTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.addNewTagRequest),
      switchMap(({ name }) =>
        this.settingsService.addNewTag(name).pipe(
          map((response) => {
            return SettingsActions.addNewTagSuccess({ id: response.id, name: response.name });
          }),
          catchError((error) => {
            let errorMessage = 'An error occurred. Please try again.';
            if (error.status === 400) {
              errorMessage = 'Bad request';
            } else if (error.status === 409) {
              errorMessage = 'This user already has this tag';
            } else if (error.status === 500) {
              errorMessage = 'Server error, please try later';
            }
            return of(SettingsActions.addNewTagFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  updateTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.updateTagRequest),
      switchMap(({ id, name }) =>
        this.settingsService.updateTag(id, name).pipe(
          map((response) => {
            //status 200 ako je uspesno
            return SettingsActions.updateTagSuccess({ id, name });
          }) //access token i user id, username
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
