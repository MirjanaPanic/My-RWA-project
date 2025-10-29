import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from '../models/auth.state';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  //on(AuthActions.loginRequest, (state) => ({ ...state, loading: true, error: null })),
  //on(AuthActions.registerRequest,(state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user: user.user,
    token: user.access_token,
    isAuthenticated: true, //login komp se sub na ovo
    loading: false,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(AuthActions.registerFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(AuthActions.resetErrorMessage, (state) => ({ ...state, error: null })),
  on(AuthActions.logout, (state) => initialState)
);
