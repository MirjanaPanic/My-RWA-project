import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { selectCurrentRound, selectSessionConfiguration, selectTimeLeft } from '../store/session.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SessionConfig } from '../models/sessionconfig';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-session',
  imports: [AsyncPipe, CommonModule, MatButtonModule],
  templateUrl: './session.html',
  styleUrl: './session.css',
})
export class Session {
  sessionConfig$: Observable<SessionConfig>;
  currentRound$: Observable<number>;
  combined$!: Observable<{ config: SessionConfig; current: number }>;
  timeLeft$: Observable<number>;

  constructor(private store: Store) {
    this.sessionConfig$ = this.store.select(selectSessionConfiguration);
    this.currentRound$ = this.store.select(selectCurrentRound);
    this.combined$ = combineLatest([this.sessionConfig$, this.currentRound$]).pipe(
      map(([config, current]) => ({ config, current }))
    );
    this.timeLeft$ = this.store.select(selectTimeLeft);
  }
}

/**<div *ngIf="sessionConfig$ | async as config">
  <p>Round time: {{ config.roundTime }}</p>
  <p>Break time: {{ config.breakTime }}</p>
  <p>Repetitions: {{ config.repetitions }}</p>
</div> */
