import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { TagsCard } from './tags-card/tags-card';
import { MessagesCard } from "./messages-card/messages-card";
import { DefaultTimerCard } from './default-timer-card/default-timer-card';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [Navbar, CommonModule, TagsCard, MessagesCard, DefaultTimerCard],
  templateUrl: '../components/settings.html',
  styleUrl: '../components/settings.css',
})
export class Settings {}
