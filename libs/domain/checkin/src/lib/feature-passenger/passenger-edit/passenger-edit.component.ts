import { httpResource } from '@angular/common/http';
import { Component, effect, input, numberAttribute, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { initialPassenger, Passenger } from '../../logic-passenger/model/passenger';

// (3) Form Logic: validators, conditional disabled, field properties

@Component({
  selector: 'app-passenger-edit',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    // (4) UI Control: Template Binding
    FormField,
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  // (1) Data Model: Writable Signal
  private readonly passenger = signal(initialPassenger);

  // (2) Form State: value, valid, dirty, touched, readonly, disabled, hidden, errors
  protected editForm = form(this.passenger);

  readonly id = input(0, { transform: numberAttribute });
  protected readonly passengerResource = httpResource<Passenger>(() => ({
    url: 'https://demo.angulararchitects.io/api/passenger',
    params: { id: this.id() }
  }), { defaultValue: initialPassenger });
  
  constructor() {
    effect(() => {
      if (this.passengerResource.hasValue()) {
        this.editForm().value.set(this.passengerResource.value());
      }
    });
  }

  protected save(event: Event): void {
    event.preventDefault();
    this.passengerResource.set(
      this.editForm().value()
    );
    console.log(
      this.editForm().value(),
      this.passenger(),
      this.passengerResource.value()
    );
  }
}
