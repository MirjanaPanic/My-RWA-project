import { Routes } from '@angular/router';
import { Login } from './features/auth/components/login/login';
import { Register } from './features/auth/components/register/register';
import { Home } from './pages/home/home';
import { StartScreen } from './layouts/start-screen/start-screen';
import { AuthGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: StartScreen,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: '', redirectTo: 'login', pathMatch: 'full' }, //defaultno
    ],
  },
  { path: 'home', component: Home, canActivate: [AuthGuard] }, //dodaj Guard-a :)
];
