import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { debounceTime, distinctUntilChanged, EMPTY, filter, map, Observable, share, Subscription, switchMap, tap, timer } from 'rxjs';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number> = timer(0, 2_000).pipe(
    map(value => value * 10),
    tap(value => console.log('Observable processing', value)),
    share()
  );
  subscription = new Subscription();

  control = new FormControl();
  flights$: Observable<Flight[]> = this.getFlightResult();
  loading = false;

  constructor(
    private http: HttpClient,
    // private flightTypeaheadFacade: FlightTypeaheadFacade
  ) { }

  ngOnInit(): void {
    // this.rxjsDemo();
  }

  getFlightResult(): Observable<Flight[]> {
    /**
     * Stream 1: Returns values from input
     * - Trigger
     * - Data Provider
     */
    return this.control.valueChanges.pipe(
      // Filtering START
      filter(city => city.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      // Filtering END
      // Side-effect: Loading state
      tap(() => this.loading = true),
      /**
       * Stream 2: HTTP backend API call -> Array of Flights
       * - Data Provider
       */
      switchMap(city => this.load(city)),
      // Side-effect: Loading state
      tap(() => this.loading = false)
    );

    // Flight[]
    const flights: Flight[] = [
      {
        id: 1,
        from: 'Wien',
        to: 'Berlin',
        delayed: false,
        date: 'today'
      }
    ];

    // Extended Flight State with loading state
    interface FlightState {
      flights: Flight[];
      state: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
    }
  }

  /**
   * Stream 2: HTTP backend API call -> Array of Flights
   * - Data Provider
   */
  load(from: string): Observable<Flight[]> {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
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
