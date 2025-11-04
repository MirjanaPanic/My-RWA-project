import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { Message } from '../../models/message.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllMessages, selectError } from '../../store/messages/messages.selectors';
import {
  addNewMessageRequest,
  deleteMessageRequest,
  getAllMessagesRequest,
  resetServerErrorMessage,
  updateMessageRequest,
} from '../../store/messages/messages.actions';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-messages-card',
  imports: [
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAnchor,
    CommonModule,
    FormsModule,
    MatLabel,
    MatTooltip,
  ],
  templateUrl: './messages-card.html',
  styleUrl: './messages-card.css',
})
export class MessagesCard {
  allMessages$: Observable<Message[]>;
  newMessage: string = '';

  clientError: string = ''; //client-side error
  serverError$: Observable<string | null>; //server-side error
  //mozda samo jedna? za obe radnje
  messageToEdit: Message | null = null;
  messageToDelete: Message | null = null;

  constructor(private store: Store) {
    this.allMessages$ = this.store.select(selectAllMessages);
    this.serverError$ = this.store.select(selectError); //prikazi je negde
  }

  addNewMessage() {
    this.clientError = ''; //reset
    this.store.dispatch(resetServerErrorMessage());
    if (this.newMessage !== '') {
      this.store.dispatch(addNewMessageRequest({ text: this.newMessage }));
      this.newMessage = ''; //clear input
    } else {
      this.clientError = 'You must enter message.';
    }
  }

  setEdit(message: Message) {
    this.messageToEdit = { ...message };
  }

  closeEdit() {
    this.messageToEdit = null;
  }

  editMessage() {
    if (this.messageToEdit?.text !== '') {
      this.store.dispatch(
        updateMessageRequest({ id: this.messageToEdit!.id, text: this.messageToEdit!.text })
      );
    }
    this.messageToEdit = null;
  }

  confirmDelete(message: Message) {
    this.messageToDelete = message;
  }

  deleteMessage(id: number) {
    //da li ste sigurni
    this.store.dispatch(deleteMessageRequest({ id }));
    this.messageToDelete = null;
  }

  cancelDelete() {
    this.messageToDelete = null;
  }

  ngOnInit() {
    this.store.dispatch(getAllMessagesRequest());
  }
}
