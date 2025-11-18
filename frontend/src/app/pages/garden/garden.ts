import { Component, ElementRef, ViewChild } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Store } from '@ngrx/store';

import { AsyncPipe } from '@angular/common';
import { combineLatest, filter, map, Observable, throttleTime, withLatestFrom } from 'rxjs';
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
import { FlowerCoordinates } from './models/plant.model';
import { fromEvent } from 'rxjs';

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
  mouseMove$!: Observable<FlowerCoordinates>;
  mouseClick$!: Observable<MouseEvent>;
  clickWithCoords$!: Observable<FlowerCoordinates>;
  @ViewChild('gardenDiv', { static: false }) gardenElement!: ElementRef;

  constructor(private store: Store) {
    this.allFlower$ = this.store.select(selectAllFlowers);

    this.completedSession$ = this.store.select(selectCompletedSessions);
    this.numberOfFlower$ = this.store.select(selectFlowersLength);

    this.canPlant$ = combineLatest([this.numberOfFlower$, this.completedSession$]).pipe(
      map(([flowers, completed]) => {
        return flowers < completed;
      })
    );

    this.canPlant$.subscribe((c) => {
      this.shouldShowButton = c;
    });
  }

  enablePlanting(event: MouseEvent) {
    event.stopPropagation();
    this.isPlantingMode = true;
  }

  plantFlower(flowerCoords: FlowerCoordinates) {
    this.store.dispatch(newFlowerRequest({ flowerCoords: flowerCoords }));

    this.shouldShowButton = false;
    this.isPlantingMode = false;
  }

  ngAfterViewInit() {
    this.mouseMove$ = fromEvent<MouseEvent>(this.gardenElement.nativeElement, 'mousemove').pipe(
      filter((e) => this.isPlantingMode),
      throttleTime(200),
      map((e) => this.getRelativeCoordinates(e))
    );

    this.mouseMove$.subscribe((e) => {
      console.log(e);
    });

    this.mouseClick$ = fromEvent<MouseEvent>(this.gardenElement.nativeElement, 'click').pipe(
      filter((e) => this.isPlantingMode)
    );

    this.mouseClick$.subscribe((e) => {
      console.log(e);
    });

    //NA svaki mouseClick se on kombinuje sa poslednjom vrednoscu iz MouseMove toka
    this.clickWithCoords$ = this.mouseClick$.pipe(
      withLatestFrom(this.mouseMove$),
      map(([click, coords]) => coords)
    );

    this.clickWithCoords$.subscribe((coords) => this.plantFlower(coords));
  }

  ngOnInit() {
    this.store.dispatch(allFlowersRequest());
    this.store.dispatch(completedSessionsRequest());
  }

  getRelativeCoordinates(event: MouseEvent): FlowerCoordinates {
    const rect = this.gardenElement.nativeElement.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }
}
