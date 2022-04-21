import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { libConfig } from '../config/config';
import { Flight } from '../models/flight';
import { DefaultFlightService } from './default-flight.service';
import { DummyFlightService } from './dummy-flight.service';


@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => {
    if (libConfig['environment'] === 'prod') {
      return new DefaultFlightService(http);
    } else {
      return new DummyFlightService();
    }
  },
  deps: [HttpClient]
})
export abstract class FlightService {
  flights: Flight[] = [];
  baseUrl = '';
  reqDelay = 1000;
  flightsCount$!: Observable<number>;

  abstract load(from: string, to: string, urgent: boolean): void;
  abstract find(
    from: string,
    to: string,
    urgent: boolean
  ): Observable<Flight[]>;

  abstract findById(id: string): Observable<Flight>;
  abstract save(flight: Flight): Observable<Flight>;
  abstract delay(): void;
}
