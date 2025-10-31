import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectError } from '../../store/auth.selectors';
import { loginRequest, resetErrorMessage } from '../../store/auth.actions';
import { formValidate } from '../../helpers/auth.validators';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  serverError$: Observable<string | null>; //server-side error
  clientError: string = ''; //client-side error

  username: string = '';
  password: string = '';

 

  constructor(private store: Store) {
    this.serverError$ = this.store.select(selectError);
  }

  login() {
    this.store.dispatch(resetErrorMessage());
    this.clientError = formValidate(this.username, this.password);
    if (!this.clientError) {
      this.store.dispatch(loginRequest({ username: this.username, password: this.password }));
    }
  }
}
