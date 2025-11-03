import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

import { TagsService } from '../../services/tags.service';
import * as TagsActions from './tags.actions';

@Injectable()
export class TagsEffects {
  private actions$ = inject(Actions); //stream svih akcija
  private router = inject(Router);
  private tagsService = inject(TagsService);

  allTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagsActions.getAllTagsRequest),
      switchMap(() =>
        this.tagsService.getAllTags().pipe(
          map((response) => {
            return TagsActions.allTagsSuccess({ tags: response });
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
      ofType(TagsActions.deleteTagRequest),
      switchMap(({ id }) =>
        this.tagsService.deleteTag(id).pipe(
          map((response) => {
            //status 200 ako je uspesno
            return TagsActions.deleteTagSuccess({ id: id });
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
      ofType(TagsActions.addNewTagRequest),
      switchMap(({ name }) =>
        this.tagsService.addNewTag(name).pipe(
          map((response) => {
            return TagsActions.addNewTagSuccess({ id: response.id, name: response.name });
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
            return of(TagsActions.addNewTagFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  updateTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagsActions.updateTagRequest),
      switchMap(({ id, name }) =>
        this.tagsService.updateTag(id, name).pipe(
          map((response) => {
            //status 200 ako je uspesno
            return TagsActions.updateTagSuccess({ id, name });
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
