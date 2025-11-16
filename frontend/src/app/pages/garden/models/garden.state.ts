import { Flower } from './flower.model';

export interface GardenState {
  flowers: Flower[];
  completedSessions: number;
}
