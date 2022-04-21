import { Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'flight-booking',
    loadChildren: () => import('./flight-booking/flight-booking.module')
      .then(esm => esm.FlightBookingModule),
    data: {
      preload: true
    }
  },
  {
    path: 'passenger',
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        loadChildren: () => import('@flight-workspace/passenger/feature-search')
          .then(esm => esm.PassengerFeatureSearchModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('@flight-workspace/passenger/feature-edit')
          .then(esm => esm.PassengerFeatureEditModule)
      }
    ]
  },
  {
    path: 'basket',
    component: BasketComponent,
    outlet: 'aux'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
