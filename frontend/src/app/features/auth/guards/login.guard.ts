import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isAuthenticated();
    if (isLoggedIn) {
      this.router.navigate(['/focus']);
      return false; //ako su autentifikovani, ne mogu da se vrate na login/register stranicu
    }
    return true;
  }
}
