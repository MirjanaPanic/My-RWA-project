import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../models/auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, (state) => state.user); //id, username
export const selectToken = createSelector(selectAuthState, (state) => state.token);
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);
export const selectUsername = createSelector(selectAuthState, (state) => state.user!.username);

export const selectLoading = createSelector(selectAuthState, (state) => state.loading);

export const selectError = createSelector(selectAuthState, (state) => state.error);
