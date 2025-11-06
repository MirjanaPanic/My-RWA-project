import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Timer } from '../../components/timer/component/timer';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsSessionActive } from '../../components/session/store/session.selectors';
import { Session } from '../../components/session/component/session';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-start-screen',
  imports: [Navbar, Timer, Session, AsyncPipe],
  templateUrl: './focus.html',
  styleUrl: './focus.css',
})
export class Focus {
  isSessionActive$: Observable<boolean>;

  constructor(private store: Store) {
    this.isSessionActive$ = this.store.select(selectIsSessionActive);
  }
}
