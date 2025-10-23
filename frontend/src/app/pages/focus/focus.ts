import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { ContentBackground } from '../../layouts/content-background/content-background';
import { Timer } from "../../components/timer/timer";

@Component({
  selector: 'app-start-screen',
  imports: [Navbar, ContentBackground, Timer],
  templateUrl: './focus.html',
  styleUrl: './focus.css',
})
export class Focus {}
