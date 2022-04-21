import {Component} from '@angular/core';
import { FlightService } from '@flight-workspace/flight-lib';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  /* providers: [FlightService] */
})
export class AppComponent {
  constructor(private flightService: FlightService) {
    this.flightService.find('Graz', 'Hamburg', false).subscribe(console.log);
  }
}
