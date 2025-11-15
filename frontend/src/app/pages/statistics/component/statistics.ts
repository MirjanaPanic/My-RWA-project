import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDailyAvgFocus } from '../store/statistics.selectors';
import { dailyAvgFocusRequest } from '../store/statistics.actions';
import { AsyncPipe } from '@angular/common';
import { Tag } from '../../settings/models/tag.model';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChartStats } from './chart-stats/chart-stats';
import { selectAllTags } from '../../settings/store/tags/tags.selectors';
import { getAllTagsRequest } from '../../settings/store/tags/tags.actions';
import { toISODate } from '../helpers/statistics-helper';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-statistics',
  imports: [
    Navbar,
    ChartStats,
    MatCardModule,
    AsyncPipe,
    MatPseudoCheckboxModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics {
  token: string | null = localStorage.getItem('access_token');

  dailyAvgFocus$: Observable<number | null>;
  allTags$: Observable<Tag[] | []>;
  selectedTags: Tag[] = [];
  weekStart: string = 'This week'; //inicijalno danasnji dan - 7 dana

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
    this.store.dispatch(getAllTagsRequest());
    this.findWeekStart();
  }

  previousWeek() {
    console.log('previous');
  }

  nextWeek() {
    console.log('next');
  }

  findWeekStart() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 7);

    this.weekStart = toISODate(weekStart);
  }
}
