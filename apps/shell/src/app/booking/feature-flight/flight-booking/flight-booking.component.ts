import { Component } from '@angular/core';


@Component({
  selector: 'app-flight-booking',
  standalone: false,
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class FlightBookingComponent {}
