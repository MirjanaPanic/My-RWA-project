import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  standalone: true,
  selector: 'app-chart-stats',
  imports: [BaseChartDirective],
  templateUrl: './chart-stats.html',
  styleUrl: './chart-stats.css',
})
export class ChartStats {}
