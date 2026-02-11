import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-flight-booking',
    template: `
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
    imports: [RouterOutlet]
})
export class FlightBookingComponent {}
