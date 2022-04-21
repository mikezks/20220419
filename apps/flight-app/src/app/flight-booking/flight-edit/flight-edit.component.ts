import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
})
export class FlightEditComponent implements OnInit {
  id = 0;
  showDetails = false;
  showWarning = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params?.get('id') ? +(params?.get('id') as string) : 0;
      this.showDetails = params?.get('showDetails') ? (params?.get('showDetails') as string) === 'true' : false;
    });
  }

  decide(answer: boolean) {}
}
