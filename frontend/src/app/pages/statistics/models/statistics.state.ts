import { Tag } from '../../settings/models/tag.model';

export interface StatisticsState {
  dailyAvgFocus: number | null;
  weekStart: string | '';
  selectedTags: Tag[] | [];
}
