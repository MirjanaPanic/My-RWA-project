import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StatisticsService } from '../service/statistics.service';
import { map, switchMap } from 'rxjs';
import * as StatisticsActions from './statistics.actions';

@Injectable()
export class StatisticsEffects {
  private actions$ = inject(Actions); //stream svih akcija
  private router = inject(Router);
  private statisticsService = inject(StatisticsService);

  avgDailyFocus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatisticsActions.dailyAvgFocusRequest),
      switchMap(() =>
        this.statisticsService.getDailyAvgFocus().pipe(
          map((response) => {
            return StatisticsActions.dailyAvgFocusSuccess({ dailyAvgFocus: response });
          })
         
        )
      )
    )
  );
}
