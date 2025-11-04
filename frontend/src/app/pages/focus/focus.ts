import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';

import { Timer } from '../../components/timer/component/timer';

@Component({
  selector: 'app-start-screen',
  imports: [Navbar, Timer],
  templateUrl: './focus.html',
  styleUrl: './focus.css',
})
export class Focus {}
