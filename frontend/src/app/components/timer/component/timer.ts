import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, filter, Observable, Subject } from 'rxjs';
import { Tag } from '../../../pages/settings/models/tag.model';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { getTagsMatchRequest } from '../store/timer.actions';
import { selectMatchingTags } from '../store/timer.selectors';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { newSessionRequest } from '../../session/store/session.actions';
import { Session } from '../../session/component/session';

@Component({
  selector: 'app-timer',
  imports: [
    Session,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatAutocompleteModule,
  ],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer {
  inputTag: string = '';

  //odabrane vrednosti, prvo defaultne
  focusTime: number = 50;
  breakTime: number = 10;
  loops: number = 4;
  selectedTag: Tag | null = null; //opcioni, prikaz reaktivan da bude

  searchSubject = new Subject<string>();
  matchedTag$: Observable<Tag[]>;

  constructor(private store: Store) {
    this.matchedTag$ = this.store.select(selectMatchingTags);
  }

  onInputTagChange(value: string) {
    //value - to sto je u input trenutno
    this.searchSubject.next(value); //upisuje se u subject svaku promenu iz inputa
    if (!value) {
      this.selectedTag = null;
    }
  }

  setSelectedTag(tag: Tag) {
    this.selectedTag = tag;
  }

  startSession() {
    this.store.dispatch(
      newSessionRequest({
        focusTime: this.focusTime,
        breakTime: this.breakTime,
        loops: this.loops,
        tagId: this.selectedTag?.id,
      })
    );
    console.log(this.focusTime, this.breakTime, this.loops, this.selectedTag);
  }

  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(500),
        filter((i) => i.length >= 3)
      )
      .subscribe((query) => {
        console.log(query);
        this.store.dispatch(getTagsMatchRequest({ input: query }));
      });
  }
}
