import { Tag } from '../../settings/models/tag.model';
import { ChartStatsData } from './chart-data.model';

export interface StatisticsState {
  dailyAvgFocus: number | null;
  weekStart: string | '';
  selectedTags: Tag[] | [];
  chartData: ChartStatsData[] | [];
}
