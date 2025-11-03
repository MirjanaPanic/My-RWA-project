import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { Message } from '../../models/message.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllMessages, selectError } from '../../store/messages/messages.selectors';
import { getAllMessagesRequest } from '../../store/messages/messages.actions';

@Component({
  selector: 'app-messages-card',
  imports: [
    MatCardModule,
    MatListModule,
    MatIcon,
    MatAnchor,
    CommonModule,
    FormsModule,
    MatFormField,
    MatInput,
  ],
  templateUrl: './messages-card.html',
  styleUrl: './messages-card.css',
})
export class MessagesCard {
  allMessages$: Observable<Message[]>;

  //errors
  clientError: string = ''; //client-side error
  serverError$: Observable<string | null>; //server-side error
  messageToEdit: Message | null = null;

  constructor(private store: Store) {
    this.allMessages$ = this.store.select(selectAllMessages);
    this.serverError$ = this.store.select(selectError); //prikazi je negde
  }

  setEdit(message: Message) {
    this.messageToEdit = message;
  }

  ngOnInit() {
    this.store.dispatch(getAllMessagesRequest());
  }
}
