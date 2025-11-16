import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartStatsData } from '../../models/chart-data.model';

@Component({
  standalone: true,
  selector: 'app-chart-stats',
  imports: [BaseChartDirective],
  templateUrl: './chart-stats.html',
  styleUrl: './chart-stats.css',
})
export class ChartStats {
  @Input() data: ChartStatsData[] = [];

  lineChartLabels: string[] = [];
  lineChartData: { data: number[]; label: string }[] = [];
  lineChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        title: { text: 'Date', display: true },
      },
      y: {
        title: { text: 'Minutes', display: true },
        beginAtZero: true,
      },
    },
  };
  lineChartType: ChartType = 'bar';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data?.length) {
      this.updateChart();
    }
  }

  private updateChart() {
    this.lineChartLabels = this.data.map((d) => d.date);
    this.lineChartData = [
      {
        data: this.data.map((d) => d.minutes),
        label: 'Time in minutes',
      },
    ];
  }
}
