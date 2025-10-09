import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartScreen } from './pages/start-screen/start-screen';

@Component({
  selector: 'app-root',
  imports: [StartScreen],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
