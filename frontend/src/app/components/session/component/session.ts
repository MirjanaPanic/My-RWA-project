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

@Component({
  selector: 'app-session',
  imports: [AsyncPipe, CommonModule, MatButtonModule],
  templateUrl: './session.html',
  styleUrl: './session.css',
})
export class Session {
  sessionConfig$: Observable<SessionConfig>; //roundTime, breakTime, loops
  //currentRound/loops
  currentRound$: Observable<number>;
  combined$: Observable<{ config: SessionConfig; current: number }>;

  //odbrojavanje
  timeLeft$: Observable<number>;
  secondsLeft: number = -1;

  displayTime: string = 'START';
  intervalId: number | null = null;
  isPaused: boolean = false;
  isBreak: boolean = false;

  constructor(private store: Store) {
    this.sessionConfig$ = this.store.select(selectSessionConfiguration);
    this.currentRound$ = this.store.select(selectCurrentRound);
    this.combined$ = combineLatest([this.sessionConfig$, this.currentRound$]).pipe(
      map(([config, current]) => ({ config, current }))
    );
    //
    this.timeLeft$ = this.store.select(selectTimeLeft);
  }

  ngOnInit() {
    this.timeLeft$.subscribe((val) => (this.secondsLeft = val));
    this.start();
  }

  start() {
    //svake sekunde izvrsava to sto joj je prvi argument
    console.log('intervalid: ' + this.intervalId);
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        this.displayTime = this.formatTime(this.secondsLeft);
        console.log('intervalid: ' + this.intervalId);
      } else {
        //breaktime, ako ima
        const end = this.combined$.subscribe((l) => {
          if (l.config.repetitions == l.current) {
            //kraj, nema vise ni pauza ni rundi
            this.stopTimer();
            this.displayTime = 'the end';
          } else {
            //pauza, jer imamo jos rundi
            this.isBreak = true;
            this.sessionConfig$.subscribe((bt) => (this.secondsLeft = bt.breakTime));
          }
        });

       
      }
    }, 1000);
  }

  pause() {
    //dispec akcija, ...
    console.log('intervalid: ' + this.intervalId);
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPaused = true;
    //akcija
  }

  continue() {
    console.log('intervalid: ' + this.intervalId);
    if (this.isPaused && this.secondsLeft > 0) {
      this.isPaused = false;
      this.start();
    }
  }

  stopTimer() {
    //da ne bi interval radio beskonacno dugo
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
