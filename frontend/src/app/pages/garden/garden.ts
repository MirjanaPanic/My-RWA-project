import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Store } from '@ngrx/store';

import { AsyncPipe } from '@angular/common';
import { combineLatest, map, Observable } from 'rxjs';
import { Flower } from './models/flower.model';
import {
  allFlowersRequest,
  completedSessionsRequest,
  newFlowerRequest,
} from './store/garden.actions';
import {
  selectAllFlowers,
  selectCompletedSessions,
  selectFlowersLength,
} from './store/garden.selectors';
import { MatAnchor } from '@angular/material/button';
import { FlowerOnScreen } from './models/plant.model';

@Component({
  selector: 'app-garden',
  imports: [Navbar, AsyncPipe, MatAnchor],
  templateUrl: './garden.html',
  styleUrl: './garden.css',
})
export class Garden {
  allFlower$: Observable<Flower[]>;
  completedSession$: Observable<number>;
  numberOfFlower$: Observable<number>;
  canPlant$: Observable<boolean>;
  isPlantingMode: boolean = false;
  isLastFlower: boolean = false;
  shouldShowButton: boolean = false;

  constructor(private store: Store) {
    this.allFlower$ = this.store.select(selectAllFlowers);
    //za enable/disable
    this.completedSession$ = this.store.select(selectCompletedSessions);
    this.numberOfFlower$ = this.store.select(selectFlowersLength);

    this.canPlant$ = combineLatest([this.numberOfFlower$, this.completedSession$]).pipe(
      map(([flowers, completed]) => {
        if (flowers < completed) {
          this.shouldShowButton = true;
        } else {
          this.shouldShowButton = false;
        }

        console.log(flowers, ' ', completed);
        return flowers < completed;
      })
    );
  }

  enablePlanting(event: MouseEvent) {
    event.stopPropagation();
    this.isPlantingMode = true;
  }

  plantFlower(event: MouseEvent) {
    if (!this.isPlantingMode) return;

    this.store.dispatch(
      newFlowerRequest({
        x: event.offsetX,
        y: event.offsetY,
      })
    );

    this.shouldShowButton = false;
    this.isPlantingMode = false;
  }

  ngOnInit() {
    this.store.dispatch(allFlowersRequest());
    this.store.dispatch(completedSessionsRequest());
  }
}
