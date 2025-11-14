import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllTags, selectDailyAvgFocus } from '../store/statistics.selectors';
import { allTagsOfUserRequest, dailyAvgFocusRequest } from '../store/statistics.actions';
import { AsyncPipe } from '@angular/common';
import { Tag } from '../../settings/models/tag.model';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChartStats } from './chart-stats/chart-stats';
import { ChartData } from 'chart.js';
@Component({
  selector: 'app-statistics',
  imports: [
    Navbar,
    ChartStats,
    MatCardModule,
    AsyncPipe,
    MatPseudoCheckboxModule,
    MatCheckboxModule,
  ],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics {
  token: string | null = localStorage.getItem('access_token');

  dailyAvgFocus$: Observable<number | null>;
  allTags$: Observable<Tag[] | []>;
  selectedTags: Tag[] = [];

  dummyData: ChartData<'bar'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Minutes worked',
        data: [50, 40, 70, 30, 60, 90, 20],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  constructor(private store: Store) {
    this.dailyAvgFocus$ = this.store.select(selectDailyAvgFocus);
    this.allTags$ = this.store.select(selectAllTags);
  }

  checkedTag(tag: Tag, checked: boolean) {
    if (checked && !this.selectedTags.some((t) => t.id === tag.id)) {
      console.log('cekiran tag' + tag.name);
      this.selectedTags.push(tag);
    } else {
      //kad se otcekira brise se iz liste
      this.selectedTags = this.selectedTags.filter((t) => t.id !== tag.id);
    }
    console.log(this.selectedTags);
  }

  ngOnInit() {
    this.store.dispatch(dailyAvgFocusRequest());
    this.store.dispatch(allTagsOfUserRequest());
  }
}
