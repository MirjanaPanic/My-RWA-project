import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import {
  selectChartData,
  selectDailyAvgFocus,
  selectSelectedTags,
  selectWeekStart,
} from '../store/statistics.selectors';
import {
  chartDataRequest,
  dailyAvgFocusRequest,
  updateSelectedTagsRequest,
  updateWeekStartRequest,
} from '../store/statistics.actions';
import { AsyncPipe } from '@angular/common';
import { Tag } from '../../settings/models/tag.model';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChartStats } from './chart-stats/chart-stats';
import { selectAllTags } from '../../settings/store/tags/tags.selectors';
import { getAllTagsRequest } from '../../settings/store/tags/tags.actions';
import {
  calculateNextWeek,
  calculatePreviousWeek,
  isNextWeekInFuture,
  dateToString,
} from '../helpers/statistics-helper';
import { MatButtonModule } from '@angular/material/button';
import { ChartStatsData } from '../models/chart-data.model';

@Component({
  selector: 'app-statistics',
  imports: [
    Navbar,
    ChartStats,
    MatCardModule,
    AsyncPipe,
    MatPseudoCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics {
  dailyAvgFocus$: Observable<number | null>;
  allTags$: Observable<Tag[] | []>;
  selectedTags: Tag[] = [];
  selectedTag$: Observable<Tag[]>;
  weekStart: string = 'This week'; //inicijalno danasnji dan - 7 dana
  weekStart$: Observable<string | ''>;
  chartData$: Observable<ChartStatsData[]>;

  constructor(private store: Store) {
    this.dailyAvgFocus$ = this.store.select(selectDailyAvgFocus);
    this.allTags$ = this.store.select(selectAllTags);
    this.selectedTag$ = this.store.select(selectSelectedTags);
    this.weekStart$ = this.store.select(selectWeekStart);
    this.chartData$ = this.store.select(selectChartData);
  }

  checkedTag(tag: Tag, checked: boolean) {
    if (checked && !this.selectedTags.some((t) => t.id === tag.id)) {
      console.log('cekiran tag' + tag.name);
      this.selectedTags = [...this.selectedTags, tag];
      console.log(this.selectedTags);
    } else {
      //kad se otcekira brise se iz liste
      this.selectedTags = this.selectedTags.filter((t) => t.id !== tag.id);
    }
    console.log(this.selectedTags);
    this.store.dispatch(updateSelectedTagsRequest({ selectedTags: this.selectedTags }));
  }

  ngOnInit() {
    this.store.dispatch(dailyAvgFocusRequest());
    this.store.dispatch(getAllTagsRequest());
    this.findWeekStart();
    this.store.dispatch(updateWeekStartRequest({ weekStart: this.weekStart }));

    combineLatest([this.weekStart$, this.selectedTag$]).subscribe(([weekStart, selectedTags]) => {
      const tagsIds = selectedTags.map((tag) => tag.id.toString()).join(',');
      const weekStartISO: string = weekStart + 'T00:00:00.000Z';
      this.store.dispatch(chartDataRequest({ weekStart: weekStartISO, selectedTagIds: tagsIds }));
    });
  }

  previousWeek() {
    this.weekStart = calculatePreviousWeek(this.weekStart);
    this.store.dispatch(updateWeekStartRequest({ weekStart: this.weekStart }));
  }

  nextWeek() {
    if (!isNextWeekInFuture(this.weekStart)) {
      this.weekStart = calculateNextWeek(this.weekStart);
    }
    this.store.dispatch(updateWeekStartRequest({ weekStart: this.weekStart }));
  }

  findWeekStart() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekStart = new Date(today);

    weekStart.setDate(today.getDate() - 6);
    this.weekStart = dateToString(weekStart);
  }
}
