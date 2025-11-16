import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GardenState } from '../models/garden.state';

export const selectGardenState = createFeatureSelector<GardenState>('garden');

export const selectAllFlowers = createSelector(
  selectGardenState,
  (state: GardenState) => state.flowers
);

export const selectCompletedSessions = createSelector(
  selectGardenState,
  (state: GardenState) => state.completedSessions
);

export const selectFlowersLength = createSelector(
  selectGardenState,
  (state: GardenState) => state.flowers.length
);
