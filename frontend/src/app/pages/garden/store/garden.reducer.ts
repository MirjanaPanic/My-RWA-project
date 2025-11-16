import { createReducer, on } from '@ngrx/store';
import { GardenState } from '../models/garden.state';
import * as GardenActions from './garden.actions';

export const initialState: GardenState = {
  flowers: [],
  completedSessions: 0,
};

export const gardenReducer = createReducer(
  initialState,
  on(GardenActions.allFlowersSuccess, (state, { flowers }) => ({
    ...state,
    flowers,
  })),
  on(GardenActions.completedSessionsSuccess, (state, { completed }) => ({
    ...state,
    completedSessions: completed,
  })),
  on(GardenActions.newFlowerSuccess, (state, { flower }) => ({
    ...state,
    flowers: [...state.flowers, flower],
  }))
);
