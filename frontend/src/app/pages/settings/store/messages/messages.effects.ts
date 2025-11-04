import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessagesService } from '../../services/messages.service';
import * as MessagesActions from './messages.actions';
import { catchError, map, of, switchMap } from 'rxjs';
@Injectable()
export class MessagesEffects {
  private actions$ = inject(Actions); //stream svih akcija
  private router = inject(Router);
  private messagesService = inject(MessagesService);

  allMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.getAllMessagesRequest),
      switchMap(() =>
        this.messagesService.getAllMessages().pipe(
          map((response) => {
            return MessagesActions.allMessagesSuccess({ messages: response });
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

  updateMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.updateMessageRequest),
      switchMap(({ id, text }) =>
        this.messagesService.updateMessage(id, text).pipe(
          map(() => {
            return MessagesActions.updateMessageSuccess({ id, text });
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

  deleteMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.deleteMessageRequest),
      switchMap(({ id }) =>
        this.messagesService.deleteMessage(id).pipe(
          map(() => {
            return MessagesActions.deleteMessageSuccess({ id });
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

  addMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.addNewMessageRequest),
      switchMap(({ text }) =>
        this.messagesService.addNewMessage(text).pipe(
          map((response) => {
            return MessagesActions.addNewMessageSuccess({ id: response.id, text: response.text });
          }),
          catchError((error) => {
            let errorMessage = 'An error occurred. Please try again.';
            if (error.status === 400) {
              errorMessage = 'Bad request';
            } else if (error.status === 409) {
              errorMessage = 'This user already has this message';
            } else if (error.status === 500) {
              errorMessage = 'Server error, please try later';
            }
            return of(MessagesActions.addNewMessageFailure({ error: errorMessage }));
          })
        )
      )
    )
  );
}
