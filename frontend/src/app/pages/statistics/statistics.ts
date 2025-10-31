import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-statistics',
  imports: [Navbar],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics {
  token: string | null = localStorage.getItem('access_token');
}
