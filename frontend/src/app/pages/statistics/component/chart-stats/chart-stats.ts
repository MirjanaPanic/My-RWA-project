import { Component } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  standalone: true,
  selector: 'app-chart-stats',
  imports: [BaseChartDirective],
  templateUrl: './chart-stats.html',
  styleUrl: './chart-stats.css',
})
export class ChartStats {
  // Primer ulaznih podataka (možeš dobiti iz API-ja)
  data = [
    { date: '2025-11-08', minutes: 20 },
    { date: '2025-11-09', minutes: 35 },
    { date: '2025-11-10', minutes: 10 },
    { date: '2025-11-11', minutes: 50 },
    { date: '2025-11-12', minutes: 100 },
    { date: '2025-11-13', minutes: 40 },
    { date: '2025-11-14', minutes: 15 },
  ];

  // X osa → datumi
  lineChartLabels = this.data.map((d) => d.date);

  // Y osa → minute
  lineChartData = [
    {
      data: this.data.map((d) => d.minutes),
      label: 'Vreme u minutima',
      fill: true,
      tension: 0.3,
    },
  ];

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        title: { text: 'Datum', display: true },
      },
      y: {
        title: { text: 'Minuti', display: true },
        beginAtZero: true,
      },
    },
  };

  lineChartType: ChartType = 'bar';
}
