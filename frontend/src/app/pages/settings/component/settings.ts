import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../../components/navbar/navbar';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [
    Navbar,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: '../component/settings.html',
  styleUrl: '../component/settings.css',
})
export class Settings {
  newTag: string = '';

  allTags = [
    { id: 1, name: 'rwa' },
    { id: 2, name: 'web' },
    { id: 3, name: 'ostalo' },
  ];

  addNewTag() {
    console.log('tag ' + this.newTag);
    //validacija da nije prazan tag ili vec postojeci
    //sad treba da se dispecuje akcija za dodavanje novog taga
  }
}
