import { EntityState } from '@ngrx/entity';
import { Tag } from './tag.model';

export interface TagState extends EntityState<Tag>{
  error: string | null;
}

