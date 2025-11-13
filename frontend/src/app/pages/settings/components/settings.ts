import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { TagsCard } from './tags-card/tags-card';
import { MessagesCard } from './messages-card/messages-card';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [Navbar, CommonModule, TagsCard, MessagesCard],
  templateUrl: '../components/settings.html',
  styleUrl: '../components/settings.css',
})
export class Settings {}
