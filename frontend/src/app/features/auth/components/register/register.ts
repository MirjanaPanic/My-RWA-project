import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(private router: Router) {}

  username: string = '';
  password: string = '';
  passwordConfirm: string = '';

  goToLogin() {
    this.router.navigate(['/login']);
  }

  register() {

    
  }
}
