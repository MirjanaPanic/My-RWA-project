import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { registerRequest, resetServerErrorMessage } from '../../store/auth.actions';
import { Observable } from 'rxjs';
import { selectError } from '../../store/auth.selectors';
import { formValidate } from '../../helpers/auth.validators';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule, //za *ngIf
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  serverError$: Observable<string | null>; //server-side error
  clientError: string = ''; //client-side error

  username: string = '';
  password: string = '';
  passwordConfirm: string = '';

  constructor(private store: Store) {
    this.serverError$ = this.store.select(selectError);
  }

  register() {
    this.store.dispatch(resetServerErrorMessage());
    this.clientError = formValidate(this.username, this.password, this.passwordConfirm);
    if (!this.clientError) {
      this.store.dispatch(registerRequest({ username: this.username, password: this.password }));
    }
    console.log(localStorage.getItem('access_token'));
  }
}
