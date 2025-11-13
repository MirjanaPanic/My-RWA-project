import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDailyAvgFocus } from '../store/statistics.selectors';
import { dailyAvgFocusRequest } from '../store/statistics.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-statistics',
  imports: [Navbar, MatCardModule, AsyncPipe],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics {
  token: string | null = localStorage.getItem('access_token');

  dailyAvgFocus$: Observable<number | null>;

  constructor(private store: Store) {
    this.dailyAvgFocus$ = this.store.select(selectDailyAvgFocus);
  }

  ngOnInit() {
    this.store.dispatch(dailyAvgFocusRequest());
  }
}
