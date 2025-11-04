import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { Tag } from '../../../pages/settings/models/tag.model';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-timer',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer {
  //matchedTag$: Observable<Tag[]>;
  inputTag: string = '';

  constructor(private store: Store) {}
}
