import { Routes } from '@angular/router';
import { Login } from './features/auth/components/login/login';
import { Register } from './features/auth/components/register/register';
import { Focus } from './pages/focus/focus';
import { StartScreen } from './layouts/start-screen/start-screen';
import { AuthGuard } from './features/auth/guards/auth.guard';
import { Settings } from './pages/settings/components/settings';
import { Statistics } from './pages/statistics/component/statistics';
import { LoginGuard } from './features/auth/guards/login.guard';
import { Garden } from './pages/garden/garden';

export const routes: Routes = [
  {
    path: '',
    component: StartScreen,
    children: [
      { path: 'login', component: Login, canActivate: [LoginGuard] },
      { path: 'register', component: Register, canActivate: [LoginGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full' }, //defaultno
    ],
  },
  { path: 'focus', component: Focus, canActivate: [AuthGuard] }, //dodaj Guard-a :) //focus page
  { path: 'settings', component: Settings, canActivate: [AuthGuard] },
  { path: 'statistics', component: Statistics, canActivate: [AuthGuard] },
  { path: 'garden', component: Garden, canActivate: [AuthGuard] },
];
