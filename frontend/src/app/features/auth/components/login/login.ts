import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private router: Router, private authService: AuthService) {}

  username = '';
  password = '';

  goToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    this.authService
      .login({ username: this.username, password: this.password })
      .subscribe((response) => {
        this.authService.saveToken(response.access_token);

        console.log(localStorage.getItem('token'));
      });
  }
}
