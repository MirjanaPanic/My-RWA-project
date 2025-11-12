import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Timer } from '../../components/timer/component/timer';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectBreaktimeStatus,
  selectHasSession,
} from '../../components/session/store/session.selectors';
import { Session } from '../../components/session/component/session';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-start-screen',
  imports: [Navbar, Timer, Session, AsyncPipe, CommonModule],
  templateUrl: './focus.html',
  styleUrl: './focus.css',
})
export class Focus {
  hasSession$: Observable<boolean>;
  //breaktime$: Observable<boolean>;

  constructor(private store: Store) {
    this.hasSession$ = this.store.select(selectHasSession);
    //this.breaktime$ = this.store.select(selectBreaktimeStatus);
  }
}
