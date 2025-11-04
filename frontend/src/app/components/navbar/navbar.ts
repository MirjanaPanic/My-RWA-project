import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../../features/auth/store/auth.actions';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  username: string | null;

  constructor(private store: Store) {
    this.username = localStorage.getItem('username');
  }

  logout() {
    this.store.dispatch(logout());
  }
}
