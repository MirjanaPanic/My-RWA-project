import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessagesService } from '../../services/messages.service';
import * as MessagesActions from './messages.actions';
import { map, switchMap } from 'rxjs';
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
