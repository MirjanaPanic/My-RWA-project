import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [CommonModule],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer {
  newSession = true;
  left = 25;
  top = 30;
  right = 60;
  bottom = 'custom';
  center = 45;
  //defaultni je 45

  onCircleClick() {
    this.newSession = false;
  }

  onDivClick() {
    console.log('div');
    //promena stanja
  }

  ngOnInit() {
    //
  }
}
