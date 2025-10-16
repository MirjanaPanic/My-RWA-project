import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;

  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill in both username and password.';
      this.form.markAllAsTouched();
      return;
    }

    const username: string = this.form.get('username')!.value;
    const password: string = this.form.get('password')!.value;
    this.authService.login({ username, password }).subscribe({
      next: (response) => {
        this.authService.saveToken(response.access_token);
        console.log('Login successful ');
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Something went wrong. Please try again later.';
        }
      },
    });

    this.errorMessage = '';
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
