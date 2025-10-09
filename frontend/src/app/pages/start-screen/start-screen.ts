import { Component } from '@angular/core';
import { Login } from '../../features/auth/components/login/login';
import { Register } from '../../features/auth/components/register/register';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  imports: [Login, Register, RouterOutlet],
  templateUrl: './start-screen.html',
  styleUrl: './start-screen.css',
})
export class StartScreen {}
