import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '../../+state';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
})
export class FlightEditComponent implements OnInit {
  id = 0;
  showDetails = false;
  showWarning = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store) {

    console.log(
      this.router.getCurrentNavigation()?.extras.state
    );
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.id = +params.get('id')!;
      this.showDetails = params.get('showDetails') === 'true';
    });

    this.store.select(selectRouteParams).subscribe(console.log);
  }

  decide(answer: boolean) {}
}
