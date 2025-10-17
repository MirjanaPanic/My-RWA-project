import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartScreen } from './layouts/start-screen/start-screen';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
