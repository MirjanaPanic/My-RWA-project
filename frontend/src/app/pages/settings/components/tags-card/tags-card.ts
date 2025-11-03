import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { Tag } from '../../models/tag.model';
import { Store } from '@ngrx/store';
import { MatTooltipModule } from '@angular/material/tooltip';
import { selectAllTags, selectError } from '../../store/tags/tags.selectors';
import {
  addNewTagRequest,
  deleteTagRequest,
  getAllTagsRequest,
  resetServerErrorMessage,
  updateTagRequest,
} from '../../store/tags/tags.actions';

@Component({
  selector: 'app-tags-card',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './tags-card.html',
  styleUrl: './tags-card.css',
})
export class TagsCard {
  newTag: string = ''; //u input polju
  allTag$: Observable<Tag[]>;

  //errors
  clientError: string = ''; //client-side error
  serverError$: Observable<string | null>; //server-side error

  tagToDelete: Tag | null = null;
  tagToEdit: Tag | null = null;

  constructor(private store: Store) {
    this.allTag$ = this.store.select(selectAllTags);
    this.serverError$ = this.store.select(selectError); //prikazi je negde
  }

  addNewTag() {
    this.clientError = ''; //reset
    this.store.dispatch(resetServerErrorMessage());
    if (this.newTag !== '') {
      this.store.dispatch(addNewTagRequest({ name: this.newTag }));
      this.newTag = ''; //clear input
    } else {
      this.clientError = 'You must enter tag.';
    }
  }

  deleteTag(id: number) {
    //promeni na true div da se prikaze
    this.store.dispatch(deleteTagRequest({ id }));
  }

  confirmDelete(tag: Tag) {
    this.tagToDelete = tag;
  }
  cancelDelete() {
    this.tagToDelete = null;
  }

  editRequest(tag: Tag) {
    this.tagToEdit = { ...tag }; //nova referenca, nezavisna od niza tagova
  }

  editTag() {
    this.store.dispatch(updateTagRequest({ id: this.tagToEdit!.id, name: this.tagToEdit!.name }));
    this.tagToEdit = null;
  }

  cancelEdit() {
    this.tagToEdit = null;
  }

  preventChipBackspace(event: KeyboardEvent) {
    event.stopPropagation();
  }

  ngOnInit() {
    this.store.dispatch(getAllTagsRequest());
  }
}
