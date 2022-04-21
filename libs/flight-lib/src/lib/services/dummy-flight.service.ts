import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { Flight } from '../models/flight';
import { FlightService } from './flight.service';

@Injectable()
export class DummyFlightService implements FlightService {
  flights: Flight[] = [];
  baseUrl = '';
  reqDelay = 1000;
  flightsCount$: Observable<number> = EMPTY;

  load(from: string, to: string, urgent: boolean): void {}
  find(
    from: string,
    to: string,
    urgent: boolean
  ): Observable<Flight[]> {
    return of([
      {
        id: 999,
        from: 'London',
        to: 'New York',
        date: new Date().toISOString(),
        delayed: false
      }
    ]);
  };

  findById(id: string): Observable<Flight> {
    return of({
      id: 999,
      from: 'London',
      to: 'New York',
      date: new Date().toISOString(),
      delayed: false
    });
  };

  save(flight: Flight): Observable<Flight> {
    return of({
      id: 999,
      from: 'London',
      to: 'New York',
      date: new Date().toISOString(),
      delayed: false
    });
  };

  delay(): void {};
}
