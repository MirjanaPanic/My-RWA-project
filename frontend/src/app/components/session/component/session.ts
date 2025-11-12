import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable, take } from 'rxjs';
import {
  selectCurrentRound,
  selectNextRound,
  selectSessionConfiguration,
  selectTimeLeft,
} from '../store/session.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SessionConfig } from '../models/sessionconfig';
import { MatButtonModule } from '@angular/material/button';
import { SessionStatus } from '../models/session.status';
import {
  breakTimeRequest,
  cancelSessionRequest,
  continueRequest,
  doneSessionRequest,
  earlyDoneSessionRequest,
  nextRoundRequest,
  pausedBreakRequest,
  pausedWorkRequest,
} from '../store/session.actions';

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

  //nextRound
  nextRound$: Observable<{ currentRound: number; timeLeft: number }>;

  displayTime: string = 'START';
  intervalId: number | null = null;

  //on client side
  status: SessionStatus = SessionStatus.IN_PROGRESS;
  SessionStatus = SessionStatus; //mora biti svojstvo klase, da bi se videlo u sablon

  constructor(private store: Store) {
    this.sessionConfig$ = this.store.select(selectSessionConfiguration);
    this.currentRound$ = this.store.select(selectCurrentRound);
    this.nextRound$ = this.store.select(selectNextRound);
    this.combined$ = combineLatest([this.sessionConfig$, this.currentRound$]).pipe(
      map(([config, current]) => ({ config, current }))
    );
    //u sekundama
    this.timeLeft$ = this.store.select(selectTimeLeft);
  }

  ngOnInit() {
    this.timeLeft$.pipe(take(1)).subscribe((val) => {
      this.secondsLeft = val; //inicijalni config
      this.sessionFlow();
    });
  }

  timeCounter() {
    this.secondsLeft--;
    this.displayTime = this.formatTime(this.secondsLeft);
  }

  successSession() {
    this.stopTimer();
    this.displayTime = 'THE END';
    this.status = SessionStatus.DONE;
    // 0 timeleft
    this.store.dispatch(doneSessionRequest({ timeLeft: this.secondsLeft, status: this.status }));
  }

  breakOrEnd() {
    const end = this.combined$.pipe(take(1)).subscribe((l) => {
      if (l.config.repetitions == l.current) {
        //kraj, nema vise ni pauza ni rundi
        this.successSession();
      } else {
        //pauza, jer imamo jos rundi
        this.breakTime();
      }
    });
  }

  nextRound() {
    this.status = SessionStatus.IN_PROGRESS;
    this.store.dispatch(nextRoundRequest({ status: this.status }));
    this.sessionConfig$.pipe(take(1)).subscribe((cfg) => {
      this.secondsLeft = cfg.roundTime;
      this.focusTime();
    });
  }

  focusTime() {
    this.stopTimer();
    this.intervalId = setInterval(() => {
      if (this.secondsLeft > 0) {
        this.timeCounter();
      } else {
        this.breakOrEnd();
      }
    }, 1000);
  }

  breakTime() {
    this.stopTimer(); //nebitno??
    this.status = SessionStatus.BREAK;
    this.store.dispatch(breakTimeRequest({ status: this.status }));

    this.sessionConfig$.pipe(take(1)).subscribe((bt) => {
      this.secondsLeft = bt.breakTime;
      this.intervalId = setInterval(() => {
        if (this.secondsLeft > 0) {
          this.timeCounter();
        } else {
          //this.stopTimer();
          this.nextRound();
        }
      }, 1000);
    });
  }

  resumeBreakTime() {
    this.stopTimer();
    this.intervalId = setInterval(() => {
      if (this.secondsLeft > 0) {
        this.timeCounter();
      } else {
        this.nextRound();
      }
    }, 1000);
  }

  pauseWork() {
    this.status = SessionStatus.PAUSED_WORK;
    this.store.dispatch(pausedWorkRequest({ timeLeft: this.secondsLeft, status: this.status }));
  }

  pauseBreak() {
    this.status = SessionStatus.PAUSED_BREAK;
    this.store.dispatch(pausedBreakRequest({ timeLeft: this.secondsLeft, status: this.status }));
  }

  sessionFlow() {
    if (this.status === SessionStatus.IN_PROGRESS) {
      this.focusTime();
    }
    if (this.status === SessionStatus.BREAK) {
      this.breakTime();
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
    if (this.status === SessionStatus.PAUSED_BREAK) {
      this.status = SessionStatus.BREAK;
      this.resumeBreakTime();
    } else if (this.status === SessionStatus.PAUSED_WORK) {
      this.status = SessionStatus.IN_PROGRESS;
      this.focusTime();
    }
  }

  cancel() {
    this.status = SessionStatus.CANCEL;
    //moze cak i da brise zapis u toj sesiji.. neka za sad tako
    this.store.dispatch(cancelSessionRequest({ status: this.status }));
  }

  earlyDone() {
    this.status = SessionStatus.EARLY_DONE;
    this.store.dispatch(
      earlyDoneSessionRequest({ timeLeft: this.secondsLeft, status: this.status })
    );
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
