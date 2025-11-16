import { createAction, props } from '@ngrx/store';
import { Flower } from '../models/flower.model';
import { FlowerOnScreen } from '../models/plant.model';

export const completedSessionsRequest = createAction('[MyGarden] Get number of completed sessions');
export const completedSessionsSuccess = createAction(
  '[MyGarden] Number of completed sessions',
  props<{ completed: number }>()
);

export const allFlowersRequest = createAction('[MyGarden] Get list of all flowers of user');
export const allFlowersSuccess = createAction(
  '[MyGarden] All flowers of user retrieved',
  props<{ flowers: Flower[] }>()
);

export const newFlowerRequest = createAction(
  '[MyGarden] Plant a new flower',
  props<{ x: number; y: number }>()
);

export const newFlowerSuccess = createAction(
  '[MyGarden] Planted new flower',
  props<{ flower: Flower }>()
);
