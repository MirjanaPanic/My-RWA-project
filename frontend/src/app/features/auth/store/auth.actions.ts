import { createAction, props } from '@ngrx/store';
import { AuthResponse } from '../models/auth.types';

export const loginRequest = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const registerRequest = createAction(
  '[Auth] Register',
  props<{ username: string; password: string }>()
);

export const logout = createAction('[Auth] Logout');

export const loginSuccess = createAction('[Auth] Login Success', props<{ user: AuthResponse }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
export const registerSuccess = createAction('[Auth] Register Success');
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: string }>()); //

export const resetServerErrorMessage = createAction("[Auth] Reset Error message after it's read");
