import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, share, Subscription, tap, timer } from 'rxjs';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number> = timer(0, 2_000).pipe(
    tap(value => console.log('Observable processing', value)),
    share()
  );
  subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.rxjsDemo();
  }

  rxjsDemo(): void {
    this.subscription.add(
      this.timer$.subscribe(value => console.log('TS callback', value))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
