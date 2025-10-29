import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions); //stream svih akcija
  private router = inject(Router);
  private authService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      switchMap(({ username, password }) =>
        this.authService.login({ username, password }).pipe(
          map((response) => {
            localStorage.setItem('username', response.user.username);
            localStorage.setItem('userId', response.user.id);
            localStorage.setItem('access_token', response.access_token);
            return AuthActions.loginSuccess({ user: response });
          }), //access token i user id, username
          catchError((error) =>
            of(
              AuthActions.loginFailure({
                error:
                  error.status === 401
                    ? 'Unauthorized user'
                    : 'An error occurred. Please try again.',
              })
            )
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerRequest),
      switchMap(({ username, password }) =>
        this.authService.register({ username, password }).pipe(
          map((response) => {
            localStorage.setItem('username', username);
            localStorage.setItem('userId', response.user.id);
            localStorage.setItem('access_token', response.access_token);
            return AuthActions.loginSuccess({ user: response });
          }),
          catchError((error) =>
            of(
              AuthActions.registerFailure({
                error:
                  error.status === 400
                    ? 'Registration failed. User already exist!'
                    : 'An error occurred. Please try again.',
              })
            )
          )
        )
      )
    )
  );

  //dodati za fail???
  //side effect
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('username');
          localStorage.removeItem('userId');
          localStorage.removeItem('access_token');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  //side effect
  //ako je uspesan login, redirektuj na /focus stranicu
  loginSuccessNavigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          //rxJS operator
          this.router.navigate(['/focus']);
        })
      ),
    { dispatch: false }
  );
}
