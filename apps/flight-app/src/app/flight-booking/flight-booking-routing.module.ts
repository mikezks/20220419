import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightBookingComponent } from './flight-booking.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightTypeaheadComponent } from './flight-typeahead/flight-typeahead.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';

const routes: Routes = [
  {
    path: 'flight-booking',
    component: FlightBookingComponent,
    children: [
      {
        path: '',
        redirectTo: 'flight-search',
        pathMatch: 'full'
      },
      {
        path: 'flight-search',
        component: FlightSearchComponent
      },
      {
        path: 'flight-typeahead',
        component: FlightTypeaheadComponent
      },
      {
        path: 'passenger-search',
        component: PassengerSearchComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightBookingRoutingModule { }
