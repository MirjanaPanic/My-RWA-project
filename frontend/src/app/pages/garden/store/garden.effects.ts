import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GardenService } from '../service/garden.service';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import * as GardenActions from './garden.actions';

@Injectable()
export class GardenEffects {
  private actions$ = inject(Actions); //stream svih akcija
  private router = inject(Router);
  private gardenService = inject(GardenService);
  private store: Store = inject(Store);

  allFlowers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GardenActions.allFlowersRequest),
      switchMap(() =>
        this.gardenService.getAllFlowers().pipe(
          map((response) => {
            return GardenActions.allFlowersSuccess({ flowers: response });
          })
        )
      )
    )
  );

  completedSessions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GardenActions.completedSessionsRequest),
      switchMap(() =>
        this.gardenService.getCompletedSessions().pipe(
          map((response) => {
            return GardenActions.completedSessionsSuccess({ completed: response });
          })
        )
      )
    )
  );

  newFlower$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GardenActions.newFlowerRequest),
      switchMap(({flowerCoords}) =>
        this.gardenService.addNewFlower(flowerCoords.x,flowerCoords.y).pipe(
          map((response) => {
            return GardenActions.newFlowerSuccess({ flower: response });
          })
        )
      )
    )
  );
}
