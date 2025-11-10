import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import {
  selectCurrentRound,
  selectSessionConfiguration,
  selectTimeLeft,
} from '../store/session.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SessionConfig } from '../models/sessionconfig';
import { MatButtonModule } from '@angular/material/button';
import { SessionStatus } from '../models/session.status';

@Component({
  selector: 'app-session',
  imports: [AsyncPipe, CommonModule, MatButtonModule],
  templateUrl: './session.html',
  styleUrl: './session.css',
})
export class Session {
  //initial session config
  sessionConfig$: Observable<SessionConfig>; //roundTime, breakTime, loops
  //currentRound/loops
  currentRound$: Observable<number>;
  combined$: Observable<{ config: SessionConfig; current: number }>;

  //odbrojavanje
  timeLeft$: Observable<number>; //tok
  secondsLeft: number = -1; //vrednost iz toka

  displayTime: string = 'START';
  intervalId: number | null = null;
  isPaused: boolean = false; //razmotri
  isBreak: boolean = false; //ramotri

  //on client side
  status: SessionStatus = SessionStatus.IN_PROGRESS;
  SessionStatus = SessionStatus; //mora biti svojstvo klase, da bi se videlo u sablon

  constructor(private store: Store) {
    this.sessionConfig$ = this.store.select(selectSessionConfiguration);
    this.currentRound$ = this.store.select(selectCurrentRound);
    this.combined$ = combineLatest([this.sessionConfig$, this.currentRound$]).pipe(
      map(([config, current]) => ({ config, current }))
    );
    //u sekundama
    this.timeLeft$ = this.store.select(selectTimeLeft);
  }

  ngOnInit() {
    this.timeLeft$.subscribe((val) => (this.secondsLeft = val));
    this.sessionFlow();
  }

  focusTime() {
    this.intervalId = setInterval(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        this.displayTime = this.formatTime(this.secondsLeft);
      } else {
        console.log('PAUZA');
        const end = this.combined$.subscribe((l) => {
          if (l.config.repetitions == l.current) {
            //kraj, nema vise ni pauza ni rundi
            this.stopTimer();
            this.displayTime = 'the end';
          } else {
            //pauza, jer imamo jos rundi
            this.status = SessionStatus.BREAK;
            this.sessionConfig$.subscribe((bt) => (this.secondsLeft = bt.breakTime));
          }
        });
      }
    }, 1000);
  }

  breakTime() {
    this.sessionConfig$.subscribe((bt) => (this.secondsLeft = bt.breakTime));
  }

  pauseWork() {
    this.status = SessionStatus.PAUSED_WORK;
  }

  pauseBreak() {
    this.status = SessionStatus.PAUSED_BREAK;
  }

  sessionFlow() {
    if (this.status === SessionStatus.IN_PROGRESS) {
      this.focusTime();
    }
    if (this.status === SessionStatus.PAUSED_WORK) {
      this.pauseWork();
    }
    if (this.status === SessionStatus.PAUSED_BREAK) {
      this.pauseBreak();
    }
  }

  pause() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.status === SessionStatus.IN_PROGRESS) {
      this.pauseWork();
    }
    if (this.status === SessionStatus.BREAK) {
      this.pauseBreak();
    }
  }

  continue() {
    if (
      this.status === SessionStatus.PAUSED_BREAK ||
      (this.status === SessionStatus.PAUSED_WORK && this.secondsLeft > 0)
    ) {
      this.status = SessionStatus.IN_PROGRESS;
    }
    this.sessionFlow();
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
