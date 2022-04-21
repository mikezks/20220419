import { Injectable } from '@angular/core';
import { FlightService } from '@flight-workspace/flight-lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import * as FlightBookingActions from './flight-booking.actions';



@Injectable()
export class FlightBookingEffects {

  loadFlightBookings$ = createEffect(() =>
    /**
     * Stream 1: Actions that are dispatched
     * - Trigger
     * - Data Provider
     */
    this.actions$.pipe(
      // Filtering
      ofType(FlightBookingActions.flightsLoad),
      /**
       * Stream 2: HTTP backend API call -> Array of Flights
       * - Data Provider
       */
      switchMap(action => this.flightService.find(
        action.from,
        action.to,
        action.urgent
      )),
      // Transformation: Use incoming data -> pack it into a new Action
      map(flights => FlightBookingActions.flightsLoaded({ flights }))
    )
  );

  constructor(
    private actions$: Actions,
    private flightService: FlightService) {}
}
