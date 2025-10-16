import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule, //za *ngIf
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  //properties
  form: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
    passwordConfirm: FormControl<string>;
  }>;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = this.fb.nonNullable.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator } //custom validator
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup;
    const password = group.get('password')?.value;
    const confirm = group.get('passwordConfirm')?.value;

    if (password && confirm && password !== confirm) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  //validaciju mislim da treba da sklonim iz ovog fajla komponente.

  register() {
    if (this.form.invalid) {
      if (this.form.hasError('passwordsMismatch')) {
        this.errorMessage = "Passwords don't match.";
      } else {
        this.errorMessage = 'Please fill all fields.';
      }
      this.form.markAllAsTouched();
      return;
    } else {
      this.errorMessage = '';
    }

    const username: string = this.form.get('username')!.value;
    const password: string = this.form.get('password')!.value;
    this.authService.register({ username, password }).subscribe({
      next: (response) => {
        this.authService.saveToken(response.access_token);
        //navigacija na neku stranicu
      },
      error: (err) => {
        if (err.status === 400) {
          //Bad Request
          this.errorMessage = err.error.message || 'Username already exists.';
        } else {
          this.errorMessage = 'Something went wrong. Please try again later.';
        }
      },
    });
  }
}
